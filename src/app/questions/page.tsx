"use client";

import { Question } from "@/atoms/questionsAtom";
import PageContent from "@/components/Layout/PageContent";
import QuestionDataTable from "@/components/Question/QuestionDataTable";
import useQuestions from "@/hooks/useQuestions";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";

type pageProps = {};

const QuestionsList: React.FC<pageProps> = () => {
  const { getAllQuestions } = useQuestions();
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchAllQuestions = async () => {
    const newQuestions = await getAllQuestions();
    const updatedQuestions = newQuestions.map((question) => ({
      ...question,
      updatedAt: moment(
        new Date(question.createdAt.seconds * 1000)
      ).toLocaleString(),
    }));
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid">
          <Text fontWeight={700} color={"white"}>
            Manage Questions
          </Text>
        </Box>
        {/* NewPost Form */}
        {questions && <QuestionDataTable questions={questions} />}
      </>
      <>
        <Flex direction={"column"}>
          <Box></Box>
        </Flex>
      </>
    </PageContent>
  );
};
export default QuestionsList;
