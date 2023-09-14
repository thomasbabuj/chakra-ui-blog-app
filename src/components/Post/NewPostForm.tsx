import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";
import { RichTextBlock } from "../RichTextEditor/RichTextEditor";
import { Post, PostBody, PostStatus } from "@/atoms/postsAtom";
import { Descendant } from "slate";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { getASlug } from "@/lib/slug";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostFormProps = {};

type PostFormProps = {
  title: string;
  shortDescription?: string;
  imageUrl?: string;
  body: PostBody[] | Descendant[];
  status: PostStatus;
};

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PostFormProps>();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textInputs, setTextInputs] = useState<PostFormProps>({
    title: "",
    shortDescription: "",
    imageUrl: "",
    body: [],
    status: "" as PostStatus,
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [serverError, setServerError] = useState(false);

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const getContentFromChild = (content: PostBody[] | Descendant[] | null) => {
    if (!content) {
      return;
    }

    textInputs.body = content;
  };

  const onSubmit: SubmitHandler<PostFormProps> = async (data) => {
    console.log(data);
    if (!user) return;

    if (JSON.stringify(initialValue) === JSON.stringify(textInputs.body)) {
      setError("body", {
        type: "minLength",
        message: "Post content should not be empty.",
      });
    }

    try {
      const slug = getASlug(data.title);
      const newPost: Post = {
        creatorId: user.uid,
        creatorDisplayName: user.email!.split("@")[0],
        slug,
        title: data.title,
        body: textInputs.body,
        shortDescription: textInputs.shortDescription,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
        status: data.status,
      };

      console.log(newPost);
      // Create the page document in firestore
      // Check that page title slug is not exist
      // If valid name, create community
      const postDocRef = doc(firestore, "postsTitles", slug);
      const postDoc = await getDoc(postDocRef);

      console.log(`Slug : ${slug}`);
      console.log(postDocRef.id);

      if (postDoc.exists()) {
        console.log("I am having error");

        setError("body", {
          type: "manual",
          message:
            "Sorry, article with this title is already exist. Please try a different title.",
        });
        return;
      }
      await setDoc(postDocRef, {
        createdAt: serverTimestamp() as Timestamp,
        creatorId: user.uid,
      });
      // store the post in db
      const newPostRef = await addDoc(collection(firestore, "posts"), newPost);

      console.log(`New Post REf`);
      console.log(newPostRef.id);
      // check for selected File
      if (selectedFile) {
        // store in the firestorage
        const imageRef = ref(storage, `posts/${newPostRef.id}/images`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadUrl = await getDownloadURL(imageRef);

        // update post doc by adding imageURL
        await updateDoc(newPostRef, {
          imageUrl: downloadUrl,
        });
      }
      // redirect the user back to the community page using the router
      router.push("/");
    } catch (error: any) {
      setServerError(true);
      console.log("handle create post error", error.message);
    }
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={"column"}
        bg="white"
        color={"black"}
        borderRadius={4}
        mt={2}
      >
        <Flex width={"100%"} p="4">
          <Stack width={"100%"}>
            <FormControl isInvalid={errors.title}>
              <Input
                id="title"
                placeholder="Title"
                {...register("title", {
                  required: "This is required",
                  minLength: {
                    value: 5,
                    message: "Minimum length should be 5",
                  },
                  maxLength: {
                    value: 256,
                    message: "Maximum length should be 256 Characters",
                  },
                })}
                fontSize={"10pt"}
                borderRadius={"4"}
                _placeholder={{
                  color: "gray.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "black",
                }}
              />

              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.shortDescription}>
              <Textarea
                id="shortDescription"
                height={"50px"}
                fontSize={"10pt"}
                borderRadius={"4"}
                placeholder="Short Description"
                _placeholder={{
                  color: "gray.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "black",
                }}
                {...register("shortDescription", {
                  maxLength: {
                    value: 150,
                    message: "Maximum length should be 150 Characters",
                  },
                })}
              />

              <FormErrorMessage>
                {errors.shortDescription && errors.shortDescription.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.imageUrl}>
              <ImageUpload
                selectedFile={selectedFile}
                onSelectImage={onSelectImage}
                setSelectedFile={setSelectedFile}
              />
              <FormErrorMessage>
                {errors.imageUrl && errors.imageUrl.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.body}>
              <RichTextBlock
                editorContent={initialValue}
                passCurrentContentToParent={getContentFromChild}
              />
              <textarea
                hidden
                aria-hidden
                id="body"
                readOnly
                {...register("body", {
                  required: "This is required",
                })}
                value={JSON.stringify(textInputs.body)}
              ></textarea>
              <FormErrorMessage>
                {errors.body && errors.body.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.status}>
              <FormLabel>Status :</FormLabel>
              <Select
                placeholder="Select post status"
                id="status"
                {...register("status", {
                  required: "This is required",
                })}
                defaultValue={"published"}
                _placeholder={{
                  color: "gray.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "black",
                }}
                fontSize={"10pt"}
                borderRadius={"4"}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
              <FormErrorMessage>
                {errors.status && errors.status.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Flex>
        {serverError && (
          <Alert status="error">
            <AlertIcon />
            <Text>Error creating a post.</Text>
          </Alert>
        )}
      </Flex>
    </form>
  );
};
export default NewPostForm;
