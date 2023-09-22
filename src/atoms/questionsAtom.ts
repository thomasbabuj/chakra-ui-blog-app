import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";
import { atom } from "recoil";

export enum QuestionStatus {
  "SUBMITTED" = "submitted",
  "APPROVED" = "approved",
  "CONVERT_TO_POST" = "convert_to_post",
}
export interface Question {
  id: string;
  question: string;
  status: QuestionStatus;
  creatorId?: string;
  email?: string;
  name?: string;
  createdAt: Timestamp;
  updatedAt?: string;
}

export interface QuestionState {
  questions: Question[];
}

const defaultQuestionState: QuestionState = {
  questions: [],
};

export const questionState = atom<QuestionState>({
  key: "questionsState",
  default: defaultQuestionState,
});
