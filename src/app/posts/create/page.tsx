"use client";

import PageContent from "@/components/Layout/PageContent";
import NotAuthorized from "@/components/NotAuthorized";
import PostForm from "@/components/Post/PostForm";
import QuestionList from "@/components/Question/QuestionList";
import { auth } from "@/firebase/clientApp";
import useQuestions from "@/hooks/useQuestions";
import { checkUser } from "@/lib/check";
import { Box, Flex, Heading } from "@chakra-ui/react";
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
      {user && checkUser(user.uid) ? (
        <>
          <PageContent>
            <>
              <Box p="14px 0px" borderBottom="1px solid" mb="2">
                <Heading as="h2" size="xl" mb={4}>
                  Create a Post
                </Heading>
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
        <NotAuthorized />
      )}
    </>
  );
};
export default CreatePostPage;
