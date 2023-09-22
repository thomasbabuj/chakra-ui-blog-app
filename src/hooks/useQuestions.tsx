import { Question, QuestionStatus, questionState } from "@/atoms/questionsAtom";
import { firestore } from "@/firebase/clientApp";
import {
  Timestamp,
  collection,
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
    useRecoilState(questionState);
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

  const getAllQuestions = async (): Promise<Question[]> => {
    // const questionQuery = query(
    //   collection(firestore, "questions"),
    //   orderBy("createdAt", "desc")
    // );

    // const questionDocs = await getDocs(questionQuery);
    // const questions = questionDocs.docs.map(
    //   (doc) =>
    //     ({
    //       id: doc.id,
    //       ...doc.data(),
    //     } as Question)
    // );

    const questions = [
      {
        id: "kjlsdjflajsdf",
        question: "this is a question 1",
        status: QuestionStatus.SUBMITTED,
        name: "test user",

        email: "test-sdfasdfsdfsdfds@test.com",
        createdAt: {
          seconds: 1613748319,
          nanoseconds: 47688698687,
        } as Timestamp,
      },
      {
        id: "oiouo",
        question:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eaque nihil ullam animi modi ipsam, tempora itaque est aspernatur sapiente eum assumenda laboriosam, cumque quibusdam pariatur provident quis quo enim.",
        status: QuestionStatus.SUBMITTED,
        name: "test user",
        email: "test@test.com",
        createdAt: {
          seconds: 1613748319,
          nanoseconds: 47688698687,
        } as Timestamp,
      },
    ];

    return Promise.resolve(questions);
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
  };
};
export default useQuestions;
