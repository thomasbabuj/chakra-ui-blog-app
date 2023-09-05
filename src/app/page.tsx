"use client";

import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import PostList from "@/components/Post/List";
import { Flex } from "@chakra-ui/react";

export default function Home({ children }: { children: React.ReactNode }) {
  const communityData = {
    imageUrl: "",
    name: "test community",
    isJoined: false,
  };
  return (
    <>
      {/* <Header communityData={communityData} /> */}
      <PageContent>
        <>
          <PostList />
        </>
        <>RHS</>
      </PageContent>
    </>
  );
}
