import { authModalState } from "@/atoms/authModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import { useSetRecoilState } from "recoil";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "green.300" }}
        mr={2}
        ml={{ base: 2, md: 4 }}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          //w={{ base: "auto", lg: "200px" }}
          w={{ lg: "100px" }}
          h={10}
        >
          <Flex align={"center"}>
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize={"10pt"}>
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList
        bgColor={"black"}
        fontSize={"10pt"}
        fontWeight={700}
        color={"green.300"}
      >
        {/* Create Communities*/}
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
