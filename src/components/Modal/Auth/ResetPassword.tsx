import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <Flex
      textAlign={"center"}
      direction={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <Image
        src="./images/favicon-liko.png"
        width={10}
        height={10}
        align={"center"}
      />
      {success ? (
        <Text m={4} fontWeight={700}>
          Check your email for further instruction!!!
        </Text>
      ) : (
        <>
          <Text fontSize={"10pt"} fontWeight={700} mt="2" mb="2">
            Enter the email associated with your account and we'll send you a
            reset link
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <Input
              required
              name="email"
              placeholder="Email"
              fontSize="10pt"
              mb={2}
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
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
            <Button width="100%" height="36px" mt={2} mb={2} type="submit">
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex justifyContent={"center"} fontSize={"9pt"} mb={2}>
        <Text
          mr={1}
          color={"green.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() => setAuthModalState({ open: true, view: "login" })}
        >
          LOGIN
        </Text>
        <Text ml="2" mr="2" fontWeight={700}>
          |
        </Text>
        <Text
          color={"green.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() => setAuthModalState({ open: true, view: "register" })}
        >
          REGISTER
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
