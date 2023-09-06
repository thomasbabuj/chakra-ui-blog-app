"use client";

import { Question } from "@/atoms/questionsAtom";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import QuestionFrom from "@/components/Question/QuestionFrom";
import QuestionList from "@/components/Question/QuestionList";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type CreatePostPageProps = {};

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  const questions: Question[] = [];
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid">
          <Text fontWeight={700}>Create a Post</Text>
        </Box>
        {/* NewPost Form */}
        <NewPostForm />
      </>
      <>
        <Flex direction={"column"}>
          <Box>
            <QuestionList questions={questions} />
          </Box>

          <Box mt="5">
            <QuestionFrom />
          </Box>
        </Flex>
      </>
    </PageContent>
  );
};
export default CreatePostPage;
