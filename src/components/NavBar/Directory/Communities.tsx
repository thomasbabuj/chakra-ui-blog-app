import QuestionModal from "@/components/Modal/Question/QuestionModal";
import { auth } from "@/firebase/clientApp";
import { checkUser } from "@/lib/check";
import { Flex, Icon, MenuDivider, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiMailSend } from "react-icons/bi";
import { TfiWrite } from "react-icons/tfi";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {};
  const router = useRouter();
  const [showInModal, setShowInModal] = useState(false);
  const [user] = useAuthState(auth);

  const createPostBtnClick = () => {
    router.push("/posts/create");
  };

  const handleOnClickQuestionModal = () => {
    setOpen(true);
    setShowInModal(true);
  };

  const manageQuestions = () => {
    router.push("/questions");
  };

  return (
    <>
      {/* <CreateCommunityModal open={open} handleClose={() => setOpen(false)} /> */}
      <QuestionModal
        open={open}
        handleClose={() => setOpen(false)}
        showInModal={showInModal}
      />
      <MenuItem
        width="100%"
        fontSize="10pt"
        bg={"black"}
        _hover={{ bg: "green.500", color: "white" }}
        color={"green.300"}
        onClick={handleOnClickQuestionModal}
      >
        <Flex align={"center"}>
          <Icon as={BiMailSend} color="white" fontSize={20} mr="2" />
          Submit a Question?
        </Flex>
      </MenuItem>
      {user && checkUser(user.uid) && (
        <>
          <MenuDivider />
          <MenuItem
            bg={"black"}
            width="100%"
            fontSize="10pt"
            _hover={{ bg: "green.500", color: "white" }}
            color={"green.300"}
            onClick={createPostBtnClick}
          >
            <Flex align={"center"}>
              <Icon as={TfiWrite} color="white" fontSize={20} mr="2" />
              Create a Post
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            bg={"black"}
            width="100%"
            fontSize="10pt"
            _hover={{ bg: "green.500", color: "white" }}
            color={"green.300"}
            onClick={manageQuestions}
          >
            <Flex align={"center"}>
              <Icon as={BiMailSend} color="white" fontSize={20} mr="2" />
              Manage Questions
            </Flex>
          </MenuItem>
        </>
      )}
    </>
  );
};
export default Communities;
