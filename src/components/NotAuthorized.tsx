import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type NotAuthorizedProps = {};

const NotAuthorized: React.FC<NotAuthorizedProps> = () => {
  return (
    <Flex justify="center" p="16px">
      <Box p="14px 0px">
        <Text fontWeight={700} color={"white"}>
          Sorry, Not Authorized!
        </Text>
      </Box>
    </Flex>
  );
};
export default NotAuthorized;
