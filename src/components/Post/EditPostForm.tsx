"use client";

import { Post, PostBody, PostStatus } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Descendant } from "slate";
import { RichTextBlock } from "../RichTextEditor/RichTextEditor";
import ImageUpload from "./ImageUpload";

type EditPostFormProps = {
  post: Post | null;
};

interface PostFormProps {
  title: string;
  body: PostBody[] | Descendant[];
  shortDescription: string;
  status: PostStatus;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textInputs, setTextInputs] = useState<PostFormProps>({
    title: "",
    shortDescription: "",
    body: [],
    status: PostStatus.PUBLISHED,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedFile, setSelectedFile] = useState<string>();

  let initialValue: PostBody[] = [
    {
      type: "paragraph",
      children: [{ text: "Enter your post content" }],
    },
  ];

  useEffect(() => {
    if (post) {
      setTextInputs({
        title: post.title,
        shortDescription: post.shortDescription ?? "",
        body: post.body,
        status: post.status,
      });

      setSelectedFile(post.imageUrl);
    }
  }, [post]);

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const getContentFromChild = (content: PostBody[] | Descendant[] | null) => {
    if (!content) {
      return;
    }

    textInputs.body = content;
  };

  const handleUpdatePost = async () => {
    if (!user) return;

    const updatePost: Post = {
      ...post,
      title: textInputs.title,
      body: textInputs.body,
      shortDescription: textInputs.shortDescription,
      updatedAt: serverTimestamp() as Timestamp,
      status: textInputs.status,
    };
    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", post?.id!);
      console.log(postDocRef.id);
      await updateDoc(postDocRef, updatePost);

      // check for selected File
      if (selectedFile) {
        // store in the firestorage
        const imageRef = ref(storage, `posts/${postDocRef.id}/images`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadUrl = await getDownloadURL(imageRef);

        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        });
      }
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      console.log("handle updatePost error", error.message);
      setError(true);
    }
    setLoading(false);
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
    <Flex
      direction={"column"}
      bg="white"
      color={"black"}
      borderRadius={4}
      mt={2}
    >
      <Flex width={"100%"} p="4">
        <Stack width={"100%"}>
          <Input
            name="title"
            value={textInputs.title}
            onChange={onTextChange}
            fontSize={"10pt"}
            borderRadius={"4"}
            placeholder="Title"
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

          <Textarea
            name="shortDescription"
            value={textInputs.shortDescription}
            onChange={onTextChange}
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
          />

          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedFile={setSelectedFile}
            currentImage={post?.imageUrl}
          />
          <RichTextBlock
            editorContent={post !== null ? post.body : initialValue}
            passCurrentContentToParent={getContentFromChild}
          />

          {/* <Input
            name="published"
            value={post?.status}
            fontSize={"10pt"}
            borderRadius={"4"}
            placeholder="Title"
            _placeholder={{
              color: "gray.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "black",
            }}
          /> */}

          <Flex justify={"flex-end"}>
            <Button
              height={"34px"}
              padding={"0px 30px"}
              disabled={!textInputs.title}
              onClick={handleUpdatePost}
              isLoading={loading}
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text>Error creating a post.</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default EditPostForm;
