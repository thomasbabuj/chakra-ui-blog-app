import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view: "login" | "register" | "resetPassword";
}

const defaultAuthModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "AuthModalState",
  default: defaultAuthModalState,
});
