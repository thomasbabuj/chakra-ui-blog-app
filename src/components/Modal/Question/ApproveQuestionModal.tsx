import { Question } from "@/atoms/questionsAtom";
import QuestionApproveForm from "@/components/Question/QuestionApproveForm";
import QuestionFrom from "@/components/Question/QuestionFrom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import React from "react";

type ApproveQuestionModalProps = {
  open: boolean;
  handleClose: () => void;
  showInModal: boolean;
  question: Question;
};

const ApproveQuestionModal: React.FC<ApproveQuestionModalProps> = ({
  open,
  handleClose,
  showInModal,
  children,
}) => {
  return (
    <div>
      <Modal isOpen={open} onClose={handleClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDir={"column"}
            fontSize={15}
            padding={3}
          >
            Approve user submitted questions
          </ModalHeader>
          <Box pl="3" pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection={"column"}
              padding={"10px 0px"}
            >
              {children}
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ApproveQuestionModal;
