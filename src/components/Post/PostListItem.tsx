import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  onEditPost: (post: Post) => Promise<any>;
};

function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

const PostListItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  onEditPost,
}) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState(false);
  const singlePostPage = !onSelectPost;

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
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

  const handleEdit = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    console.log("On Edit button clicked.");
    router.push(`/posts/edit/${post.id}`);
  };

  return (
    <>
      <Flex
        border="1px solid"
        bg="green.100"
        borderRadius={4}
        borderColor={singlePostPage ? "green.100" : "gray.300"}
      >
        <Flex
          direction={"column"}
          align={"center"}
          bg="gray.100"
          p="2"
          width={"40px"}
          borderRadius={4}
        >
          <Icon
            as={
              userVoteValue === 1
                ? IoArrowUpCircleSharp
                : IoArrowUpCircleOutline
            }
            color={userVoteValue === 1 ? "brand.100" : "gray.400"}
            onClick={(event) => onVote(event, post, 1)}
            cursor={"pointer"}
            fontSize={25}
          />
          <Text fontSize={"10pt"} fontWeight={500}>
            {post.voteStatus}
          </Text>
          <Icon
            as={
              userVoteValue === -1
                ? IoArrowDownCircleSharp
                : IoArrowDownCircleOutline
            }
            color={userVoteValue === 1 ? "#4379ff" : "gray.400"}
            onClick={(event) => onVote(event, post, -1)}
            cursor={"pointer"}
            fontSize={25}
          />
        </Flex>

        <Flex direction="row" width={"100%"}>
          <Flex width={150} height={"150px"}>
            {post.imageUrl && (
              <Flex justify={"center"} align={"center"} p={2}>
                {loadingImage && <Skeleton height={"150px"} width={"100%"} />}
                {/* <Image
                  src={post.imageUrl}
                  width={"100%"}
                  maxH={"150px"}
                  alt={"Post Image"}
                  display={loadingImage ? "none" : "unset"}
                  onLoad={() => setLoadingImage(false)}
                /> */}

                <Image
                  src={post.imageUrl}
                  width={150}
                  height={150}
                  alt={`${post.title}_image}`}
                ></Image>
              </Flex>
            )}
          </Flex>
          <Flex direction={"column"} p="2" width={"100%"}>
            <Stack>
              <Text
                width={"100%"}
                fontWeight={700}
                fontSize={"18"}
                _hover={{ borderColor: "blue.500" }}
                cursor={"pointer"}
                onClick={() => onSelectPost && onSelectPost(post)}
              >
                {post.title}
              </Text>
              <Flex direction={"row"} fontSize={"10pt"}>
                <Text>Posted By l/{post.creatorDisplayName}</Text>
                <Text pl="2" fontWeight={"700"}>
                  {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                </Text>
              </Flex>
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
                  <>
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
                    <Flex
                      align={"center"}
                      p="8px 10px"
                      borderRadius={4}
                      _hover={{ bg: "gray.200" }}
                      cursor={"pointer"}
                      color={"gray.700"}
                    >
                      <>
                        <Icon as={AiFillEdit} />
                        <Text fontSize={"9pt"} pl="2" onClick={handleEdit}>
                          Edit
                        </Text>
                      </>
                    </Flex>
                  </>
                )}
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>Error deleting a post.</Text>
          </Alert>
        )}
      </Flex>
    </>
  );
};
export default PostListItem;
