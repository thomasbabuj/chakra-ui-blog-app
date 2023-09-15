import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="left" maxW="1200px">
        {/* LHS */}
        <Flex
          direction={"column"}
          width={{ base: "100%", md: "75%" }}
          mr={{ base: 0, md: 6 }}
          border={"1px solid"}
          p="2"
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS * */}
        <Flex
          direction={"column"}
          display={{ base: "none", md: "flex" }}
          flexGrow={"1px"}
          width={"250px"}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
