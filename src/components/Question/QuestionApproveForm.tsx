import { Question, QuestionStatus } from "@/atoms/questionsAtom";
import { firestore } from "@/firebase/clientApp";
import useQuestions from "@/hooks/useQuestions";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import {
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type QuestionApproveFormProps = {
  data: Question;
  closeModal: () => void;
};

const QuestionApproveForm: React.FC<QuestionApproveFormProps> = ({
  data,
  closeModal,
}) => {
  const initialRef = useRef(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Question>();

  const [formSubmit, setFormSubmit] = useState(false);
  const [serverError, setServerError] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
    message: "",
  });

  const { questionStateValue, setQuestionStateValue } = useQuestions();

  const updateQuestion = async (id: string, status: QuestionStatus) => {
    try {
      const questionDocRef = doc(firestore, "questions", id);
      const questionDoc = await getDoc(questionDocRef);

      if (!questionDoc.exists()) {
        throw new Error(`Question doesn't exist`);
      }

      const toUpdate: Question = {
        id: questionDoc.id,
        ...questionDoc.data(),
        status,
        updatedAt: serverTimestamp() as Timestamp,
      } as Question;

      await updateDoc(questionDocRef, {
        ...toUpdate,
      });

      // Update the Question State value
      // https://stackoverflow.com/questions/70698302/updating-the-value-of-an-array-of-objects-stored-in-recoil-js
      let newList = [...questionStateValue.questions].map((item) => {
        if (item.id === id) return toUpdate;
        else return item;
      });
      setQuestionStateValue({ questions: newList });

      closeModal();
    } catch (error: any) {
      setServerError({
        status: false,
        message: error.message,
      });
    }
  };

  const onSubmit: SubmitHandler<Question> = (formData) => {
    setFormSubmit(true);

    if (formData.status !== data.status) {
      updateQuestion(data.id, formData.status);
    }

    setFormSubmit(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Name - {data.id} </FormLabel>
          <Input ref={initialRef} value={data?.name ?? ""} readOnly />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input value={data?.email ?? ""} readOnly />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Question</FormLabel>
          <Textarea value={data?.question ?? ""} readOnly />
        </FormControl>

        <FormControl isInvalid={errors.status}>
          <FormLabel fontSize={"10pt"}>Status</FormLabel>
          <Select
            placeholder="Select post status"
            id="status"
            {...register("status", {
              required: "This is required",
            })}
            defaultValue={data.status}
          >
            {(
              Object.keys(QuestionStatus) as (keyof typeof QuestionStatus)[]
            ).map((key, index) => {
              return (
                <option key={index} value={QuestionStatus[key]}>
                  {QuestionStatus[key]}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>
            {errors.status && errors.status.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            isLoading={formSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </>
  );
};
export default QuestionApproveForm;
