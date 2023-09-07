import { auth } from "@/firebase/clientApp";
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction={"column"} width={"100%"} mb={3}>
      <Button
        variant={"oauth"}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/google-48.png"
          height={10}
          width={20}
          alt="google-logo"
        />
        <Text ml="1">Continue with Google</Text>
      </Button>
      <Button mt="2" variant={"oauth"}>
        Continue with Facebook
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
