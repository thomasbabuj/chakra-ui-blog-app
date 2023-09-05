import { atom } from "recoil";

interface Question {
  id: string;
  question: string;
  isPublished: boolean;
  creatorId: string;
}

interface QuestionState {
  questions: Question[];
}

const defaultQuestionState: QuestionState = {
  questions: [],
};

export const questionState = atom<QuestionState>({
  key: "questionsState",
  default: defaultQuestionState,
});
