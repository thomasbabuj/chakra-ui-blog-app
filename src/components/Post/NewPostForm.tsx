"use client";

import { Post, PostStatus } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RichTextBlock } from "../RichTextEditor/RichTextEditor";
import { Node } from "slate";

type NewPostFormProps = {};

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textInputs, setTextInputs] = useState<{ title: string; body: Node[] }>(
    {
      title: "",
      body: [],
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    if (!user) return;

    const newPost: Post = {
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      status: PostStatus.PUBLISHED,
    };
    setLoading(true);
    try {
      // store the post in db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // redirect the user back to the community page using the router
      router.push("/");
    } catch (error: any) {
      console.log("handle create post error", error.message);
      setError(true);
    }
    setLoading(false);
  };

  const onSelectImage = () => {};

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Enter your post content" }],
    },
  ];

  const getContentFromChild = (content: Node[] | null) => {
    if (!content) {
      return;
    }

    textInputs.body = content;
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
          {/* <Textarea
            name="body"
            value={textInputs.body}
            onChange={onTextChange}
            height={"100px"}
            fontSize={"10pt"}
            borderRadius={"4"}
            placeholder="Post Message"
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

          <RichTextBlock
            editorContent={initialValue}
            passCurrentContentToParent={getContentFromChild}
          />

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
export default NewPostForm;
