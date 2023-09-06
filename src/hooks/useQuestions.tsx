import { Question, QuestionStatus, questionState } from "@/atoms/questionsAtom";
import { firestore } from "@/firebase/clientApp";
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";

const useQuestions = () => {
  const [questionStateValue, setQuestionStateValue] =
    useRecoilState(questionState);
  const [fetchQuestionStatus, setFetchQuestionStatus] = useState(false);

  const addAQuestion = () => {};
  // const getLatestQuestionsList = async () => {};

  const getLatestTenQuestions = async () => {
    try {
      setFetchQuestionStatus(true);
      const questionQuery = query(
        collection(firestore, "questions"),
        where("status", "==", QuestionStatus.SUBMITTED),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const questionDocs = await getDocs(questionQuery);
      const questions = questionDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestionStateValue((prev) => ({
        ...prev,
        questions: questions as Question[],
      }));

      setFetchQuestionStatus(false);
    } catch (error: any) {
      console.log("Get Latest Questions error", error.message);
    }
  };

  return {
    // question data and its functions
    questionStateValue,
    setQuestionStateValue,
    addAQuestion,
    getLatestTenQuestions,
    fetchQuestionStatus,
    setFetchQuestionStatus,
  };
};
export default useQuestions;
