import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export enum QuestionStatus {
  "SUBMITTED" = "submitted",
  "APPROVED" = "approved",
  "CONVERT_TO_POST" = "convert_to_post",
  "REJECTED" = "rejected",
  "SPAM" = "spam",
}
export interface Question {
  id: string;
  question: string;
  status: QuestionStatus;
  creatorId?: string;
  email?: string;
  name?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface QuestionState {
  questions: Question[];
}

const defaultQuestionState: QuestionState = {
  questions: [],
};

export const questionsState = atom<QuestionState>({
  key: "questionsState",
  default: defaultQuestionState,
});
