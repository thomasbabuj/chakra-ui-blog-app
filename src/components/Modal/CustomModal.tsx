// components/Modal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalTitle: string;
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalTitle = "Custom Modal",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {/* Add any footer content or buttons here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
