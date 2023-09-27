"use client";

import { Question } from "@/atoms/questionsAtom";
import PageContent from "@/components/Layout/PageContent";
import QuestionDataTable from "@/components/Question/QuestionDataTable";
import { auth } from "@/firebase/clientApp";
import useQuestions from "@/hooks/useQuestions";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type pageProps = {};

const QuestionsList: React.FC<pageProps> = () => {
  const [user] = useAuthState(auth);
  const { getAllQuestions, questionStateValue } = useQuestions();

  useEffect(() => {
    getAllQuestions();
  }, []);
  return (
    <PageContent>
      <>
        {!user && <>Not authorized</>}

        {user && (
          <>
            <Box p="14px 0px" borderBottom="1px solid">
              <Text fontWeight={700} color={"white"}>
                Manage Questions
              </Text>
            </Box>
            {questionStateValue && <QuestionDataTable />}
          </>
        )}
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
