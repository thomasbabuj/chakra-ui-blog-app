import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction={"column"} width={"100%"} mb={3}>
      <Button variant={"oauth"}>
        <Image src="./images/google-48.png" height={10} p={2} /> Continue with
        Google
      </Button>
      <Button mt="2" variant={"oauth"}>
        Continue with Facebook
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
