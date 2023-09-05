import useQuestionData from "@/hooks/useQuestionData";
import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  //const { getLatestQuestionsList, questionStateValue } = useQuestionData();

  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxW="860px">
        {/* LHS */}
        <Flex
          direction={"column"}
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS * */}
        <Flex
          direction={"column"}
          display={{ base: "100%", md: "flex" }}
          flexGrow={"1px"}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
