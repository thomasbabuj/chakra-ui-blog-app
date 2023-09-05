import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: {
    imageUrl?: string;
    name: string;
    isJoined: boolean;
  };
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  return (
    <Flex direction={"column"} width={"100%"} height={"146px"}>
      <Box height={"50%"} bg="green.400" />
      <Flex justify={"center"} bg={"white"} flexGrow={1}>
        <Flex width="95%" maxWidth={"860px"}>
          {communityData.imageUrl ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position={"relative"}
              top={-3}
              color={"green.500"}
              border="4px solid white"
              borderRadius={"50%"}
            />
          )}
          <Flex padding={"10px 16px"}>
            <Flex direction={"column"} mr="6">
              <Text fontWeight={800} fontSize={"16pt"}>
                {communityData.name}
              </Text>
              <Text fontWeight={600} fontSize={"10pt"} color="gray.200">
                {communityData.name}
              </Text>
            </Flex>
            <Button
              variant={communityData.isJoined ? "outline" : "solid"}
              height={"30px"}
              pr={6}
              pl="6"
              onClick={() => {}}
            >
              {communityData.isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
