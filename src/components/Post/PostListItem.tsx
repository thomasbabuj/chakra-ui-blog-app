import { Post } from "@/atoms/postsAtom";
import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
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
      <Flex direction={"column"} bg="gray.700" borderRadius={"4px"}>
        <Flex
          flexDirection={["row"]}
          color="black"
          bg="white"
          align={"center"}
          alignItems="flex-start"
          borderRadius={"4px 4px 0px 0px"}
        >
          {/* Voting Section */}
          <Box
            mr={["0", "1rem"]}
            mb={["1rem", "0"]}
            height={"100%"}
            alignContent={"center"}
          >
            <Flex direction="column" alignItems="center" p="2">
              <Icon
                as={
                  userVoteValue === 1
                    ? IoArrowUpCircleSharp
                    : IoArrowUpCircleOutline
                }
                color={userVoteValue === 1 ? "brand.100" : "gray.400"}
                onClick={(event) => onVote(event, post, 1)}
                cursor={"pointer"}
                fontSize={35}
              />
              <Text fontSize="lg">123</Text>
              <Icon
                as={
                  userVoteValue === -1
                    ? IoArrowDownCircleSharp
                    : IoArrowDownCircleOutline
                }
                color={userVoteValue === 1 ? "#4379ff" : "gray.400"}
                onClick={(event) => onVote(event, post, -1)}
                cursor={"pointer"}
                fontSize={35}
              />
            </Flex>
          </Box>

          {/* Post Information */}
          <Flex flex="1" flexDirection={["column", "row"]}>
            <Box mr="1rem" display={["flex"]}>
              <Box
                position={"relative"}
                width={["100%", "200px"]}
                height="200px"
                onClick={() => onSelectPost && onSelectPost(post)}
                cursor={"pointer"}
              >
                {/* https://stackoverflow.com/questions/76652423/image-with-src-next-static-media-has-legacy-prop-layout-did-you-forge */}
                <Image
                  src={
                    post.imageUrl
                      ? post.imageUrl
                      : "https://geeky-nextjs-demo.vercel.app/_next/image?url=%2Fimages%2Fpost%2Fparenting.png&w=2048&q=75"
                  }
                  alt="Image"
                  // Takes the full width and height of its parent
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                  }} // Scales the image while maintaining aspect ratio
                />
              </Box>
            </Box>
            <Box flex="1">
              <Flex
                flexDir="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                {/* Mobile Only: Post Title */}
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  mb="0.5rem"
                  display={["flex", "none"]} // Flex on mobile, hide on desktop
                  cursor={"pointer"}
                  onClick={() => onSelectPost && onSelectPost(post)}
                >
                  {post.title}
                </Text>

                {/* Mobile Only: Author and Created Time */}
                <Text
                  fontSize="md"
                  color="gray.600"
                  display={["flex", "none"]} // Flex on mobile, hide on desktop
                  pb="2"
                >
                  by {post.creatorDisplayName}{" "}
                  {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                </Text>

                {/* Desktop: Post Title */}
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  mb="0.5rem"
                  display={["none", "flex"]} // Hide on mobile, show as flex on desktop
                  cursor={"pointer"}
                  onClick={() => onSelectPost && onSelectPost(post)}
                >
                  {post.title}
                </Text>

                {/* Desktop: Author and Created Time */}
                <Text
                  fontSize="md"
                  color="gray.600"
                  display={["none", "flex"]} // Hide on mobile, show as flex on desktop                  "
                >
                  by {post.creatorDisplayName} -
                  {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>

        {/* Action Icons */}
        <Flex
          justifyContent={["space-between"]}
          borderRadius={"0px 0px 4px 4px"}
        >
          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "brand.100" }}
            cursor={"pointer"}
            color={"white"}
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
            _hover={{ bg: "brand.100" }}
            cursor={"pointer"}
            color={"white"}
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
            _hover={{ bg: "brand.100" }}
            cursor={"pointer"}
            color={"white"}
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
                _hover={{ bg: "brand.100" }}
                cursor={"pointer"}
                color={"white"}
              >
                <Icon as={AiFillEdit} />
                <Text fontSize={"9pt"} pl="2" onClick={handleEdit}>
                  Edit
                </Text>
              </Flex>
              <Flex
                align={"center"}
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "brand.100" }}
                cursor={"pointer"}
                color={"white"}
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
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default PostListItem;
