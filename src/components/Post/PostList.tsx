import { Post, PostStatus } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostListIem";
import { useAuthState } from "react-firebase-hooks/auth";
import PostLoader from "./PostLoader";

type PostListProps = {};

const PostList: React.FC<PostListProps> = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  const getPosts = async () => {
    try {
      setLoading(true);
      // Get all published posts
      const postQuery = query(
        collection(firestore, "posts"),
        where("status", "==", PostStatus.PUBLISHED),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      setLoading(false);
    } catch (error: any) {
      console.log("GetPosts error", error.message);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue?.posts?.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={undefined}
              onDeletePost={onDeletePost}
              onVote={onVote}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default PostList;
