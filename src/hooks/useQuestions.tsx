import {
  Question,
  QuestionStatus,
  questionsState,
} from "@/atoms/questionsAtom";
import { firestore } from "@/firebase/clientApp";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";

const useQuestions = () => {
  const [questionStateValue, setQuestionStateValue] =
    useRecoilState(questionsState);
  const [fetchQuestionStatus, setFetchQuestionStatus] = useState(false);

  const addAQuestion = () => {};
  // const getLatestQuestionsList = async () => {};

  const getLatestTenQuestions = async () => {
    try {
      setFetchQuestionStatus(true);
      const questionQuery = query(
        collection(firestore, "questions"),
        where("status", "==", QuestionStatus.APPROVED),
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

  const getAllQuestions = async (): Promise<void> => {
    setFetchQuestionStatus(true);
    try {
      const questionQuery = query(
        collection(firestore, "questions"),
        orderBy("createdAt", "desc")
      );

      const questionDocs = await getDocs(questionQuery);
      const questions = questionDocs.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Question)
      );

      setQuestionStateValue((prev) => ({
        ...prev,
        questions: questions as Question[],
      }));
    } catch (error: any) {
      console.log(`Error Fetching All Questions List `, error.message);
    }
    setFetchQuestionStatus(false);
  };

  const deleteQuestion = async (questionId: string): Promise<void> => {
    console.log(`Delete Question id ${questionId}`);

    const questionDocRef = doc(firestore, "questions", questionId);
    const questionDoc = await getDoc(questionDocRef);

    if (!questionDoc.exists()) {
      throw new Error(`Question doesn't exist`);
    }

    await deleteDoc(questionDocRef);

    let newList = [...questionStateValue.questions].filter(
      (item) => item.id !== questionId
    );

    console.log(newList);

    setQuestionStateValue({ questions: newList });
  };

  return {
    // question data and its functions
    questionStateValue,
    setQuestionStateValue,
    addAQuestion,
    getLatestTenQuestions,
    fetchQuestionStatus,
    setFetchQuestionStatus,
    getAllQuestions,
    deleteQuestion,
  };
};
export default useQuestions;
