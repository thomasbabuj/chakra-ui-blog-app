import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostPageProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (post: Post, vote: number) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
};

const PostPage: React.FC<PostPageProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      console.log("Post was successfully deleted");
    } catch (error: any) {
      console.log("Handle Delete ", error.message);
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="green.100"
      borderRadius={"4px 4px 0px 0px"}
      borderColor={"green.100"}
    >
      <Flex
        direction={"column"}
        align={"center"}
        p="2"
        width={"40px"}
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          onClick={() => onVote(post, 1)}
          cursor={"pointer"}
        />
        <Text fontSize={"9pt"} fontWeight={500}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === 1 ? "#4379ff" : "gray.400"}
          onClick={() => onVote(post, -1)}
          cursor={"pointer"}
        />
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>Error deleting a post.</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack
            direction={"row"}
            spacing={0.6}
            align={"center"}
            fontSize={"9pt"}
          >
            {/* Add condition to show the category */}
            <Text>Posted By l/{post.creatorDisplayName}</Text>
            <Text pl="2" fontWeight={"700"}>
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"12pt"} fontWeight={600} height={"15%"}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"} height={"auto"} mt="4">
            {post.body}
          </Text>
          {post.imageUrl && (
            <Flex justify={"center"} align={"center"} p={2}>
              {loadingImage && <Skeleton height={"200px"} width={"100%"} />}
              <Image
                src={post.imageUrl}
                maxH={"460px"}
                alt={"Post Image"}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color={"gray.500"} mt="10">
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
            color={"gray.700"}
          >
            <Icon as={BsChat} />
            <Text fontSize={"9pt"} pl="2">
              {post.numberOfComments}
            </Text>
          </Flex>

          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
            color={"gray.700"}
          >
            <Icon as={IoArrowRedoOutline} />
            <Text fontSize={"9pt"} pl="2">
              Share
            </Text>
          </Flex>

          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor={"pointer"}
            color={"gray.700"}
          >
            <Icon as={IoBookmarkOutline} />
            <Text fontSize={"9pt"} pl="2">
              Save
            </Text>
          </Flex>

          {userIsCreator && (
            <Flex
              align={"center"}
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
              color={"gray.700"}
            >
              {loadingDelete ? (
                <>
                  <Spinner size="sm" />
                </>
              ) : (
                <>
                  <Icon as={AiOutlineDelete} />
                  <Text fontSize={"9pt"} pl="2" onClick={handleDelete}>
                    Delete
                  </Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostPage;
