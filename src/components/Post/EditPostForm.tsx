"use client";

import { Post, PostBody, PostStatus } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
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
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RichTextBlock } from "../RichTextEditor/RichTextEditor";
import { BaseEditor, BaseElement, BaseText, Descendant, Node } from "slate";

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

  const handleCreatePost = async () => {
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
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      console.log("handle updatePost error", error.message);
      setError(true);
    }
    setLoading(false);
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
              onClick={handleCreatePost}
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
