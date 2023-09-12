"use client";

import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import QuestionList from "@/components/Question/QuestionList";
import useQuestions from "@/hooks/useQuestions";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

type CreatePostPageProps = {};

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  const { questionStateValue, getLatestTenQuestions } = useQuestions();

  useEffect(() => {
    if (questionStateValue.questions.length === 0) {
      getLatestTenQuestions();
    }
  }, []);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid">
          <Text fontWeight={700} color={"white"}>
            Create a Post
          </Text>
        </Box>
        {/* NewPost Form */}
        <NewPostForm />
        {/* <Box>
          <RichTextBlock />
        </Box> */}
      </>
      <>
        <Flex direction={"column"}>
          <Box>
            <QuestionList data={questionStateValue} isLoading={false} />
          </Box>
        </Flex>
      </>
    </PageContent>
  );
};
export default CreatePostPage;
