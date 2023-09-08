import QuestionFrom from "@/components/Question/QuestionFrom";
import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type QuestionModalProps = {
  open: boolean;
  handleClose: () => void;
  showInModal: boolean;
};

const QuestionModal: React.FC<QuestionModalProps> = ({
  open,
  handleClose,
  showInModal,
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
            Submit a question?
          </ModalHeader>
          <Box pl="3" pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection={"column"}
              padding={"10px 0px"}
            >
              <QuestionFrom showInModal={showInModal} />
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default QuestionModal;
