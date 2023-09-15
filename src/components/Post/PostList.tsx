import { Post } from "@/atoms/postsAtom";
import { auth } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostListItem from "./PostListItem";
import PostLoader from "./PostLoader";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [lastKey, setLastKey] = useState<{ id: string; createdAt: Timestamp }>({
    id: "",
    createdAt: {
      seconds: 0,
      nanoseconds: 0,
    } as Timestamp,
  });
  const [nextPosts_loading, setNextPostsLoading] = useState(false);
  const [fetchAction, setFetchAction] = useState("next");

  const { postsFirstBatch, postsNextBatch } = usePosts();

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
    onEditPost,
  } = usePosts();

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      const posts = (await postsFirstBatch()) as Post[];

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts,
      }));

      setLastKey({
        id: posts[posts.length - 1].id as string,
        createdAt: posts[posts.length - 1].createdAt as Timestamp,
      });
      setLoading(false);
    } catch (error: any) {
      console.log("Fetch Latest Posts Error ", error.message);
      setLoading(false);
    }
  };

  const fetchMorePosts = async (key) => {
    try {
      if (Object.keys(key).length !== 0 && fetchAction === "next") {
        setNextPostsLoading(true);

        const nextPosts = (await postsNextBatch(key.createdAt)) as Post[];

        if (nextPosts.length === 0) {
          setLastKey({
            id: "",
            createdAt: {
              seconds: 0,
              nanoseconds: 0,
            } as Timestamp,
          });
          setFetchAction("end");
        }

        if (nextPosts.length > 0) {
          setPostStateValue((prev) => ({
            ...prev,
            posts: [...prev.posts, ...nextPosts],
          }));

          setLastKey({
            id: nextPosts[nextPosts.length - 1].id as string,
            createdAt: nextPosts[nextPosts.length - 1].createdAt as Timestamp,
          });
        }
        setNextPostsLoading(false);
      }
    } catch (error: any) {
      console.log(`Fetch more posts errors`, error.message);
      setNextPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack direction="column">
          {postStateValue?.posts?.map((item) => (
            <PostListItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === item.id)
                  ?.voteValue
              }
              onDeletePost={onDeletePost}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onEditPost={onEditPost}
            />
          ))}

          {nextPosts_loading ? (
            <>
              <PostLoader />
            </>
          ) : (
            <Flex direction={"column"} align={"center"}>
              <Box>
                <>
                  {!lastKey?.id && fetchAction === "end" ? (
                    <>
                      <Text color="gray.500" fontWeight={700}>
                        You are already read all out post. Thank you.
                      </Text>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => fetchMorePosts(lastKey)}>
                        Load more
                      </Button>
                    </>
                  )}
                </>
              </Box>
            </Flex>
          )}
        </Stack>
      )}
    </>
  );
};
export default PostList;
