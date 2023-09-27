import { Question } from "@/atoms/questionsAtom";
import useQuestions from "@/hooks/useQuestions";
import {
  Box,
  Button,
  Flex,
  ModalFooter,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomModal from "../Modal/CustomModal";
import QuestionApproveForm from "./QuestionApproveForm";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

type QuestionDataTableProps = {};

const QuestionDataTable: React.FC<QuestionDataTableProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Question | null>(null); // Store the selected item here
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { questionStateValue, deleteQuestion, setQuestionStateValue } =
    useQuestions();

  const handleEditQuestion = (question: Question) => {
    setSelectedItem(question);
    setIsOpen(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setDeleteItemId(questionId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteItemId) {
      try {
        deleteQuestion(deleteItemId);
        setDeleteItemId(null);
        setIsOpen(false);
      } catch (error: any) {
        console.log(`Delete Question Error : ${error.message}`);
      }
    }
  };

  useEffect(() => {
    console.log(`Inside Questions List:`);
    console.log(questionStateValue);
  }, [questionStateValue]);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        modalTitle={!selectedItem ? "Confirm Delete" : "Approve User Question"}
      >
        {selectedItem && (
          <QuestionApproveForm data={selectedItem} closeModal={closeModal} />
        )}

        {!selectedItem && <>Are you sure you want to delete?</>}

        {!selectedItem && (
          <ModalFooter>
            {/* Add any footer content or buttons here */}
            <Button variant="ghost" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button onClick={confirmDelete}>
              {!selectedItem && "Confirm"}
            </Button>
          </ModalFooter>
        )}
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
                      {row.createdAt.toDate().toLocaleDateString()}
                    </Td>
                    <Td>
                      <Box>
                        <Button
                          variant="ghost"
                          onClick={() => handleEditQuestion(row)}
                        >
                          Edit
                        </Button>
                      </Box>

                      <Box mt="2">
                        <Button
                          variant="ghost"
                          onClick={() => handleDeleteQuestion(row.id)}
                        >
                          Delete
                        </Button>
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
