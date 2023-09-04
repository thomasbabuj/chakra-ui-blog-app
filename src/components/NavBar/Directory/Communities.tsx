import CreateCommunityModal from "@/components/Modal/Community/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {};
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
    </>
  );
};
export default Communities;
