import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Post, PostBody, PostStatus, postState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { getASlug } from "@/lib/slug";
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
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { Descendant } from "slate";
import { RichTextBlock } from "../RichTextEditor/RichTextEditor";
import ImageUpload from "./ImageUpload";

type NewPostFormProps = {
  action: "create" | "edit";
  post?: Post | null;
};

type PostFormProps = {
  title: string;
  shortDescription?: string;
  imageUrl?: string;
  body: PostBody[] | Descendant[];
  status: PostStatus;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  action = "create",
  post,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
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
  const [serverError, setServerError] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
    message: "",
  });
  const setPostState = useSetRecoilState(postState);

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
    if (!user) return;

    if (JSON.stringify(initialValue) === JSON.stringify(textInputs.body)) {
      setError("body", {
        type: "minLength",
        message: "Post content should not be empty.",
      });
    }

    console.log(`Post Form Action - ${action}`);

    if (action === "edit") {
      return handleEditPost(user, data);
    }

    handleCreatePost(user, data);
  };

  const handleCreatePost = async (user: User, data: PostFormProps) => {
    try {
      const slug = getASlug(data.title);
      const newPost: Post = {
        creatorId: user.uid,
        creatorDisplayName: user.email!.split("@")[0],
        slug,
        title: data.title,
        body: textInputs.body,
        shortDescription: data.shortDescription,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
        status: data.status,
      };

      // Create the page document in firestore
      // Check that page title slug is not exist
      // If valid name, create community
      const postDocRef = doc(firestore, "postsTitles", slug);
      const postDoc = await getDoc(postDocRef);

      if (postDoc.exists()) {
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
      setServerError({ status: true });
      console.log("handle create post error", error.message);
    }
  };

  const handleEditPost = async (user: User, data: PostFormProps) => {
    console.log("Inside handle edit post");

    // Check the userId same as post author id
    if (user.uid !== post?.creatorId) {
      setServerError({
        status: true,
        message: "You are not allowed to edit this post.",
      });
    }

    const editedPost: Post = {
      creatorId: post ? post.creatorId : user.uid,
      creatorDisplayName: post
        ? post.creatorDisplayName
        : user.email!.split("@")[0],
      slug: post?.slug,
      title: data.title,
      body: textInputs.body,
      shortDescription: data.shortDescription,
      numberOfComments: post?.numberOfComments ?? 0,
      voteStatus: post?.voteStatus ?? 0,
      createdAt: post?.createdAt as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
      status: post?.status!,
    };

    const batch = writeBatch(firestore);

    // check if the edit form title slug is same as the current one
    if (data.title !== post?.title) {
      const newSlug = getASlug(data.title);

      console.log(`New Slug : ${newSlug}`);

      const postDocRef = doc(firestore, "postsTitles", newSlug);
      const postDoc = await getDoc(postDocRef);

      if (postDoc.exists()) {
        setError("title", {
          type: "manual",
          message:
            "Sorry, article with this title is already exist. Please try a different title.",
        });
        return;
      }

      // create a new slug in the postTitles
      batch.set(postDocRef, {
        createdAt: serverTimestamp() as Timestamp,
        creatorId: user.uid,
      });

      // remove the old slug from the postTitles
      batch.delete(doc(firestore, "postsTitles", post?.slug!));

      editedPost.slug = newSlug;
    }

    const postDocRef = doc(firestore, "posts", post?.id!);
    console.log(postDocRef.id);

    batch.update(postDocRef, editedPost);

    await batch.commit();

    setPostState((prev) => ({
      ...prev,
      selectedPost: {
        ...editedPost,
      } as Post,
    }));

    router.push("/");
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

  useEffect(() => {
    if (action === "edit" && post) {
      setValue("title", post.title);
      setValue("shortDescription", post.shortDescription);
      setSelectedFile(post.imageUrl);
    }
  }, [action, post]);

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
                editorContent={post ? post.body : initialValue}
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
              <FormLabel fontSize={"10pt"}>Status :</FormLabel>
              <Select
                placeholder="Select post status"
                id="status"
                defaultValue={action === "edit" ? post?.status : ""}
                {...register("status", {
                  required: "This is required",
                })}
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
        {serverError.status && (
          <Alert status="error">
            <AlertIcon />
            {serverError.message ? (
              <Text>{serverError.message}.</Text>
            ) : (
              <Text>Error creating / editing a post.</Text>
            )}
          </Alert>
        )}
      </Flex>
    </form>
  );
};
export default NewPostForm;
