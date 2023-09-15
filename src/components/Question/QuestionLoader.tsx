import { Box, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const QuestionLoader: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Box padding="10px 10px" boxShadow={"lg"} bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
      <Box padding="10px 10px" boxShadow={"lg"} bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={2} spacing="4" />
      </Box>
    </Stack>
  );
};
export default QuestionLoader;
