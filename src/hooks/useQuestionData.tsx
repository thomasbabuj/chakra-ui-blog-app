import { questionState } from "@/atoms/questionsAtom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const useQuestionData = () => {
  const [loading, setLoading] = useState(false);
  const [questionStateValue, setQuestionStateValue] =
    useRecoilState(questionState);

  const createQuestion = () => {};
  const getLatestQuestionsList = () => {};

  return {
    // question data and its functions
    questionStateValue,
    createQuestion,
    getLatestQuestionsList,
  };
};
export default useQuestionData;
