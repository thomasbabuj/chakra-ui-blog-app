"use client";

import PageContent from "@/components/Layout/PageContent";
import PostList from "@/components/Post/List";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <PageContent>
      <>
        <PostList />
      </>
      <>RHS</>
    </PageContent>
  );
}
