"use client";

import { Post } from "@/atoms/postsAtom";
import PageContent from "@/components/Layout/PageContent";
import NotAuthorized from "@/components/NotAuthorized";
import NewPostForm from "@/components/Post/PostForm";
import { auth } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { checkUser } from "@/lib/check";
import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type EditPostPageProps = {
  params: { pid: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const EditPostPage: React.FC<EditPostPageProps> = ({ params }) => {
  const { postStateValue, setPostStateValue, getAPost } = usePosts();
  const [user] = useAuthState(auth);

  const postId = params?.pid ? params.pid : "";
  const [error, setError] = useState(false);
  const [postFetchLoading, setPostFetchLoading] = useState(true);

  const fetchPost = async (postId: string) => {
    try {
      const post = await getAPost(postId);
      if (post.exists()) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: { id: post.id, ...(post.data() as Post) },
        }));
        setPostFetchLoading(false);
      } else {
        setError(true);
        setPostFetchLoading(false);
      }
    } catch (error: any) {
      console.log("Fetch Get Post error", error.message);
    }
  };

  // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
  useEffect(() => {
    if (params.pid && !postStateValue.selectedPost && user) {
      fetchPost(postId);
    }

    if (postStateValue) {
      setPostFetchLoading(false);
    }
  }, [postId, !postStateValue.selectedPost, user]);

  return (
    <>
      {user && checkUser(user.uid) ? (
        <>
          <PageContent>
            <>
              <Box p="14px 0px" borderBottom="1px solid">
                <Heading as="h2" size="xl" mb={4}>
                  Edit a Post
                </Heading>
              </Box>
              {/* NewPost Form */}
              <NewPostForm
                action="edit"
                post={postStateValue.selectedPost}
                isFetching={postFetchLoading}
              />
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

export default EditPostPage;
