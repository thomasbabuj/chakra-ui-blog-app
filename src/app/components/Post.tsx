"use client";
// components/Post.js
import { Box, Flex, Text, IconButton, Heading } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";

const Post = ({ title, upvotes, downvotes }) => {
  const posts = [
    { id: 1, title: "First Post", upvotes: 10, downvotes: 2 },
    { id: 2, title: "Second Post", upvotes: 5, downvotes: 1 },
    // Add more posts here
  ];

  return (
    <Flex borderWidth="1px" p="4" borderRadius="md" align="center">
      <Flex direction="column" align="center">
        <IconButton icon={<ChevronUpIcon />} size="sm" aria-label="Upvote" />
        <Text mx="2">{upvotes - downvotes}</Text>
        <IconButton
          icon={<ChevronDownIcon />}
          size="sm"
          aria-label="Downvote"
        />
      </Flex>
      <Box ml="4">
        <Image src="/likobuzz-logo.png" alt="title" width={100} height={100} />
      </Box>
      <Flex direction="column" align="left">
        <Heading ml="4">{title}</Heading>
        <Text ml="4">{title}</Text>
      </Flex>
    </Flex>
  );
};

export default Post;
