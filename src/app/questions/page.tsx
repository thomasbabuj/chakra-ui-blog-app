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
    if (user) {
      getAllQuestions();
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
                  Manage Questions
                </Text>
              </Box>
              {questionStateValue && <QuestionDataTable />}
            </>
            <></>
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
export default QuestionsList;
