import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <AuthModal />
      <Flex direction={"column"} align={"center"}>
        <Button
          variant="outline"
          height="28px"
          display={{ base: "none", sm: "flex" }}
          width={{ base: "70px", md: "110px" }}
          mr={2}
          onClick={() => setAuthModalState({ open: true, view: "login" })}
        >
          Login
        </Button>
        <Text fontWeight={700}> OR </Text>
        <Button
          height="28px"
          display={{ base: "none", sm: "flex" }}
          width={{ base: "70px", md: "110px" }}
          mr={2}
          onClick={() => setAuthModalState({ open: true, view: "register" })}
        >
          Register
        </Button>
      </Flex>
    </>
  );
};
export default AuthButtons;
