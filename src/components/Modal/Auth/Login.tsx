import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
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

  const setAuthModalState = useSetRecoilState(authModalState);

  const onSubmit = () => {};
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
      />

      <Button
        type="submit"
        onSubmit={onSubmit}
        width="100%"
        height="36px"
        mt={2}
        mb={2}
      >
        Log In
      </Button>

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
