import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
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
import { createEditor } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { Element } from "../RichTextEditor/Elements";
import { Leaf } from "../RichTextEditor/Leaf";

type PostPageProps = {
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
};

const PostPage: React.FC<PostPageProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);

  const editor = useMemo(() => withReact(createEditor()), []);

  const initialValue = [
    {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    },
  ];

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      console.log("Post was successfully deleted");
      // redirect the user to home page
      router.push("/");
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
    <Flex
      border="1px solid"
      borderRadius={"4px 4px 0px 0px"}
      borderColor={"green.100"}
      color={"white"}
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
          onClick={(event) => onVote(event, post, 1)}
          cursor={"pointer"}
          fontSize={25}
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
          onClick={(event) => onVote(event, post, -1)}
          fontSize={25}
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

          <Heading as="h1" size="3xl">
            {post.title}
          </Heading>

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

          <Box fontSize={"10pt"} mt="2">
            <Slate
              editor={editor}
              initialValue={post.body ? post.body : initialValue}
            >
              <Editable
                readOnly
                renderElement={renderElement}
                renderLeaf={renderLeaf}
              />
            </Slate>
          </Box>

          {/* <Text fontSize={"10pt"} height={"auto"} mt="4">
            {post.body}
          </Text> */}
        </Stack>
        <Flex ml={1} mb={0.5} color={"gray.500"} mt="10">
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
          )}

          <Flex
            align={"center"}
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "brand.100" }}
            cursor={"pointer"}
            color={"white"}
          >
            <>
              <Icon as={AiFillEdit} />
              <Text fontSize={"9pt"} pl="2" onClick={handleEdit}>
                Edit
              </Text>
            </>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostPage;
