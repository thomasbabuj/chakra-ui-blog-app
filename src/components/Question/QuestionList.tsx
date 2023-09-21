import { QuestionState } from "@/atoms/questionsAtom";
import { Box, Flex, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import QuestionLoader from "./QuestionLoader";

type QuestionListProps = {
  data: QuestionState;
  isLoading: boolean;
};

const QuestionList: React.FC<QuestionListProps> = ({ data, isLoading }) => {
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
        color={"black"}
      >
        {isLoading ? (
          <QuestionLoader />
        ) : (
          <VStack
            divider={<StackDivider borderColor={"black"} />}
            spacing={2}
            align={"stretch"}
          >
            {data.questions.length === 0 ? (
              <Box fontSize={"10pt"}>
                <Text>Sorry, no questions yet.</Text>
              </Box>
            ) : (
              data.questions.map((item) => (
                <Box key={item.id} width={"100%"} fontSize={"10pt"}>
                  <Text>{item.question}</Text>
                </Box>
              ))
            )}
          </VStack>
        )}
      </Flex>
    </Box>
  );
};
export default QuestionList;
