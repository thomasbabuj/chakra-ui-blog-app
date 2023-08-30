// pages/index.js
import { Container, VStack } from "@chakra-ui/react";
import Post from "../components/Post";
import posts from "../../data/post";

const PostList = () => {
  return (
    <Container maxW="xl" mt="8" mb="5">
      <VStack spacing="4" align="stretch">
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
        ))}
      </VStack>
    </Container>
  );
};

export default PostList;
