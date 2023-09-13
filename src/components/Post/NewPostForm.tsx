"use client";

import { Post, PostStatus } from "@/atoms/postsAtom";
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
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RichTextBlock } from "../RichTextEditor/RichTextEditor";
import { Node } from "slate";
import ImageUpload from "./ImageUpload";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostFormProps = {};

interface PostFormProps {
  title: string;
  body: Node[];
  shortDescription: string;
}

const NewPostForm: React.FC<NewPostFormProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textInputs, setTextInputs] = useState<PostFormProps>({
    title: "",
    shortDescription: "",
    body: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedFile, setSelectedFile] = useState<string>();

  const handleCreatePost = async () => {
    if (!user) return;

    const newPost: Post = {
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      shortDescription: textInputs.shortDescription,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      status: PostStatus.PUBLISHED,
    };
    setLoading(true);
    try {
      // store the post in db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

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
      // redirect the user back to the community page using the router
      router.push("/");
    } catch (error: any) {
      console.log("handle create post error", error.message);
      setError(true);
    }
    setLoading(false);
  };

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
          />

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
