import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align={"center"}
        borderColor="green.200"
      >
        <Flex
          mr="1.5"
          ml="1.5"
          padding="1"
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "green.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Icons;
