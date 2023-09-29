import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Firebase_Errors } from "@/firebase/error";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const setAuthModalState = useSetRecoilState(authModalState);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        color={"black"}
      />
      <Input
        required
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        color={"black"}
      />

      <Text color={"red"} fontSize="10pt" align={"center"}>
        {Firebase_Errors[error?.message as keyof typeof Firebase_Errors]}
      </Text>

      <Button
        type="submit"
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        isLoading={loading}
      >
        Log In
      </Button>

      <Flex justifyContent={"center"} fontSize={"9pt"} mb={2}>
        <Text mr={1}>Forgot your password!</Text>
        <Text
          color={"green.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState({ open: true, view: "resetPassword" })
          }
        >
          Reset
        </Text>
      </Flex>

      <Flex fontSize={"9pt"} justifyContent={"center"}>
        <Text mr="1">New Here?</Text>
        <Text
          color="green.500"
          fontWeight={700}
          cursor={"pointer"}
          onClick={() => setAuthModalState({ open: true, view: "register" })}
        >
          Register
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
