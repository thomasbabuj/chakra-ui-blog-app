"use client";

import PageContent from "@/components/Layout/PageContent";
import PostList from "@/components/Post/PostList";
import QuestionFrom from "@/components/Question/QuestionFrom";
import QuestionList from "@/components/Question/QuestionList";
import useQuestions from "@/hooks/useQuestions";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";

//github.com/vercel/next.js/issues/49578#issuecomment-1663203443
// export const runtime = "edge";

export default function Home({ children }: { children: React.ReactNode }) {
  const { questionStateValue, getLatestTenQuestions, fetchQuestionStatus } =
    useQuestions();

  useEffect(() => {
    getLatestTenQuestions();
  }, []);

  return (
    <>
      {/* <Header communityData={communityData} /> */}
      <PageContent>
        <>
          <PostList />
        </>
        <>
          <Flex direction={"column"}>
            <Box>
              <QuestionList
                data={questionStateValue}
                isLoading={fetchQuestionStatus}
              />
            </Box>

            <Box mt="5">
              <QuestionFrom />
            </Box>
          </Flex>
        </>
      </PageContent>
    </>
  );
}
