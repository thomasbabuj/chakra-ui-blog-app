import { QuestionStatus } from "@/atoms/questionsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPerson } from "react-icons/bs";

type QuestionFromProps = {
  showInModal: boolean;
};

interface QuestionForm {
  email: string;
  name: string;
  question: string;
}

const QuestionFrom: React.FC<QuestionFromProps> = ({ showInModal = false }) => {
  const [user] = useAuthState(auth);
  const [questionForm, setQuestionForm] = useState<QuestionForm>({
    email: "",
    name: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isShowHeader] = useState(showInModal);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestionForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    setSuccess(false);
    event.preventDefault();
    setLoading(true);
    try {
      const additionalInfo = user
        ? {
            name: user.displayName,
            email: user.email,
            status: QuestionStatus.SUBMITTED,
            createdAt: serverTimestamp(),
            creatorId: user.uid,
          }
        : {
            status: QuestionStatus.SUBMITTED,
            createdAt: serverTimestamp(),
          };
      const questionDocRef = await addDoc(collection(firestore, "questions"), {
        ...questionForm,
        ...additionalInfo,
      });
      if (questionDocRef) {
        setQuestionForm({ email: "", question: "", name: "" });
        setSuccess(true);
      }
    } catch (error: any) {
      console.log("Question From submit error", error.message);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Box>
      {!isShowHeader && (
        <Flex
          justify={"space-between"}
          align="center"
          bg="green.500"
          color="white"
          p="3"
          borderRadius={"4px 4px 0px 0px"}
        >
          <Text fontSize={"10pt"} fontWeight={700}>
            Submit a Request
          </Text>
        </Flex>
      )}
      <Flex
        direction={"column"}
        p="3"
        bg="white"
        borderRadius={"0px 0px 4px 4px"}
      >
        {success && (
          <Flex justify="center" p="16px 0px">
            <Text color={"brand.100"} fontWeight={700}>
              Thank you for submitting your question!
            </Text>
          </Flex>
        )}
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            {!user ? (
              <>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BsPerson className="bsPersonIcon" />
                  </InputLeftElement>
                  <Input
                    required
                    name="name"
                    type="text"
                    placeholder="Name"
                    fontSize="10pt"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "blue.500",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "blue.500",
                    }}
                    bg="gray.50"
                    onChange={onChange}
                    value={questionForm.name}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    fontSize="10pt"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                      bg: "white",
                      border: "1px solid",
                      borderColor: "blue.500",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "white",
                      border: "1px solid",
                      borderColor: "blue.500",
                    }}
                    bg="gray.50"
                    onChange={onChange}
                    value={questionForm.email}
                  />
                </InputGroup>
              </>
            ) : (
              <></>
            )}
            <InputGroup>
              <Textarea
                required
                name="question"
                placeholder="Enter your question"
                size="sm"
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                bg="gray.50"
                onChange={onChange}
                value={questionForm.question}
              />
            </InputGroup>

            <Button
              type="submit"
              width="100%"
              height="36px"
              mt={2}
              mb={2}
              isLoading={loading}
            >
              Send
            </Button>
          </Stack>
        </form>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>Error submitting your question.</Text>
          </Alert>
        )}
      </Flex>
    </Box>
  );
};
export default QuestionFrom;
