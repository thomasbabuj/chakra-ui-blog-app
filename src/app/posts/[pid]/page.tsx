"use client";

import { Post } from "@/atoms/postsAtom";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Post/PostListIem";
import QuestionFrom from "@/components/Question/QuestionFrom";
import QuestionList from "@/components/Question/QuestionList";
import { auth } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import useQuestions from "@/hooks/useQuestions";
import { Alert, AlertIcon, Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type pageProps = {
  params: { pid: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// https://stackoverflow.com/questions/74570835/how-to-do-dynamic-routes-with-nextjs-13/74574345#74574345
const page: React.FC<pageProps> = ({ params }) => {
  const { questionStateValue, getLatestTenQuestions } = useQuestions();
  useEffect(() => {
    if (questionStateValue.questions.length === 0) {
      getLatestTenQuestions();
    }
  }, []);
  const { postStateValue, setPostStateValue, onDeletePost, onVote, getAPost } =
    usePosts();

  const [user] = useAuthState(auth);
  const postId = params.pid ? params.pid : "";
  const [error, setError] = useState(false);

  const getThisPost = async () => {
    const post = await getAPost(postId);
    if (post.exists()) {
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: post.data() as Post,
      }));
    } else {
      setError(true);
    }
  };

  // https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
  useEffect(() => {
    if (postId) {
      getThisPost();
    }
  }, [postId]);

  return (
    <PageContent>
      <>
        {error && (
          <Flex justify="center" p="16px 0px">
            <Alert status="error">
              <AlertIcon />
              <Text>Sorry, post not found.</Text>
            </Alert>
          </Flex>
        )}
        {postStateValue.selectedPost && !error && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
        {/* */}
      </>
      <>
        <Flex direction={"column"}>
          <Box>
            <QuestionList data={questionStateValue} isLoading={false} />
          </Box>

          <Box mt="5">
            <QuestionFrom />
          </Box>
        </Flex>
      </>
    </PageContent>
  );
};
export default page;
