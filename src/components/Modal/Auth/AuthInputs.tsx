import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";

import { authModalState } from "@/atoms/authModalAtom";
import Login from "@/components/Modal/Auth/Login";
import Register from "@/components/Modal/Auth/Register";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modelState = useRecoilValue(authModalState);
  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modelState.view === "login" && <Login />}
      {modelState.view === "register" && <Register />}
    </Flex>
  );
};
export default AuthInputs;
