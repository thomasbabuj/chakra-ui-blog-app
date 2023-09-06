"use client";

import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import PostList from "@/components/Post/List";
import QuestionFrom from "@/components/Question/QuestionFrom";
import QuestionList from "@/components/Question/QuestionList";
import { Box, Flex } from "@chakra-ui/react";

//github.com/vercel/next.js/issues/49578#issuecomment-1663203443
// export const runtime = "edge";

export default function Home({ children }: { children: React.ReactNode }) {
  const communityData = {
    imageUrl: "",
    name: "test community",
    isJoined: false,
  };

  const questions = [
    {
      id: "1",
      question: "my question 1 dsfsdfadsfa sdfdsfasdf sdfdsfdsf",
      isPublished: true,
      creatorId: "1",
    },
    {
      id: "2",
      question:
        "my question 2 dfds sdfsd sdsfds dsfdsfds fdsfdsf dsfdsf dsfdsfds",
      isPublished: true,
      creatorId: "1",
    },
    {
      id: "3",
      question: "my question 3",
      isPublished: true,
      creatorId: "1",
    },
    {
      id: "4",
      question: "my question 4",
      isPublished: true,
      creatorId: "1",
    },
    {
      id: "5",
      question: "my question 5",
      isPublished: true,
      creatorId: "1",
    },
  ];

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
              <QuestionList questions={questions} />
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
