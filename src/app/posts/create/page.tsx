"use client";

import PageContent from "@/components/Layout/PageContent";
import PostForm from "@/components/Post/PostForm";
import QuestionList from "@/components/Question/QuestionList";
import { auth } from "@/firebase/clientApp";
import useQuestions from "@/hooks/useQuestions";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type CreatePostPageProps = {};

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  const { questionStateValue, getLatestTenQuestions } = useQuestions();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (questionStateValue.questions.length === 0 && user) {
      getLatestTenQuestions();
    }
  }, [user]);
  return (
    <>
      {user ? (
        <>
          <PageContent>
            <>
              <Box p="14px 0px" borderBottom="1px solid">
                <Text fontWeight={700} color={"white"}>
                  Create a Post
                </Text>
              </Box>
              {/* NewPost Form */}
              <PostForm />
            </>
            <>
              <Flex direction={"column"}>
                <Box>
                  <QuestionList data={questionStateValue} isLoading={false} />
                </Box>
              </Flex>
            </>
          </PageContent>
        </>
      ) : (
        <Flex justify="center" p="16px">
          <Box p="14px 0px">
            <Text fontWeight={700} color={"white"}>
              Sorry, Not Authorized!
            </Text>
          </Box>
        </Flex>
      )}
    </>
  );
};
export default CreatePostPage;
