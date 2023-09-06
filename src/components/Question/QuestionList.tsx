import { Question } from "@/atoms/questionsAtom";
import { Box, Flex, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";

type QuestionListProps = {
  questions: Question[];
};

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <Box position={"sticky"} top="14px">
      <Flex
        justify={"space-between"}
        align="center"
        bg="green.500"
        color="white"
        p="3"
        borderRadius={"4px 4px 0px 0px"}
      >
        <Text fontSize={"10pt"} fontWeight={700}>
          Latest Submission
        </Text>
        {/* <Icon as={HiOutlineDotsHorizontal} /> */}
      </Flex>
      <Flex
        direction={"column"}
        p="3"
        bg="white"
        borderRadius={"0px 0px 4px 4px"}
      >
        <VStack
          divider={<StackDivider borderColor={"black"} />}
          spacing={2}
          align={"stretch"}
        >
          {questions.map((item) => (
            <Box key={item.id} width={"100%"} fontSize={"10pt"}>
              <Text>{item.question}</Text>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};
export default QuestionList;
