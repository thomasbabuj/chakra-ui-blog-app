import CreateCommunityModal from "@/components/Modal/Community/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {};
  const router = useRouter();

  const createPostBtnClick = () => {
    router.push("/posts/create");
  };

  return (
    <>
      <CreateCommunityModal open={open} handleClose={onClose} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "green:300" }}
        onClick={() => setOpen(true)}
      >
        <Flex align={"center"}>
          <Icon as={GrAdd} fontSize={20} mr="2" />
          Create Community
        </Flex>
      </MenuItem>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "green:300" }}
        onClick={createPostBtnClick}
      >
        <Flex align={"center"}>
          <Icon as={GrAdd} fontSize={20} mr="2" />
          Create a Post
        </Flex>
      </MenuItem>
    </>
  );
};
export default Communities;
