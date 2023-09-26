import React, { ChangeEvent, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Question, QuestionStatus } from "@/atoms/questionsAtom";
import { DataTable } from "../DataTable";
import DataTableWithPagination from "./DataTableWithPagination";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import QuestionModal from "../Modal/Question/QuestionModal";
import ApproveQuestionModal from "../Modal/Question/ApproveQuestionModal";
import { Timestamp } from "firebase/firestore";
import QuestionApproveForm from "./QuestionApproveForm";
import CustomModal from "../Modal/CustomModal";
import useQuestions from "@/hooks/useQuestions";
import moment from "moment";

type QuestionDataTableProps = {
  //questions: Question[];
};

const QuestionDataTable: React.FC<QuestionDataTableProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Question | null>(null); // Store the selected item here

  const { questionStateValue } = useQuestions();

  const handleEditQuestion = (question: Question) => {
    setSelectedItem(question);
    setIsOpen(true);
  };

  const handleDeleteQuestion = () => {
    console.log("I am here in delete modal..");
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {}, [questionStateValue]);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        modalTitle="Approve User Question"
      >
        {selectedItem && (
          <QuestionApproveForm data={selectedItem} closeModal={closeModal} />
        )}

        {!selectedItem && <>Show Delete Modal</>}
      </CustomModal>

      <Flex direction="column" width="100%">
        <Box overflowX="auto">
          <Box borderRadius="lg" p="4">
            {/* Container */}
            <Table size="sm" layout="fixed">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Question</Th>
                  <Th>Status</Th>
                  <Th>Submitted Date</Th>
                  <Th>Approved On</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {questionStateValue.questions.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.name}</Td>
                    <Td maxW="200px" wordBreak="break-word">
                      {row.question}
                    </Td>
                    <Td>{row.status}</Td>
                    <Td>
                      {/* https://stackoverflow.com/questions/52247445/how-do-i-convert-a-firestore-date-timestamp-to-a-js-date */}
                      {/* {new Date(
                        row.createdAt.seconds * 1000
                      ).toLocaleDateString()} */}
                    </Td>
                    <Td>
                      {/* {row.updatedAt !== undefined
                        ? new Date(
                            row.updatedAt.seconds * 1000
                          ).toLocaleDateString()
                        : ""} */}
                    </Td>
                    <Td>
                      <Box>
                        <Link
                          href={"#"}
                          onClick={() => handleEditQuestion(row)}
                        >
                          Edit
                        </Link>
                      </Box>

                      <Box>
                        <Link href={"#"} onClick={() => handleDeleteQuestion()}>
                          Delete
                        </Link>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
export default QuestionDataTable;
