"use client";

import PageContent from "@/components/Layout/PageContent";
import NotAuthorized from "@/components/NotAuthorized";
import QuestionDataTable from "@/components/Question/QuestionDataTable";
import { auth } from "@/firebase/clientApp";
import useQuestions from "@/hooks/useQuestions";
import { checkUser } from "@/lib/check";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
      {user && checkUser(user.uid) ? (
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
        <NotAuthorized />
      )}
    </>
  );
};
export default QuestionsList;
