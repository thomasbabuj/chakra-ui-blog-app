import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
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
        <Image src="./images/google-48.png" height={10} p={2} /> Continue with
        Google
      </Button>
      <Button mt="2" variant={"oauth"}>
        Continue with Facebook
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
