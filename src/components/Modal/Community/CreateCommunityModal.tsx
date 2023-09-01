import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");

  const onCommunityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // recalculate the char length

    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  return (
    <div>
      <Modal isOpen={open} onClose={handleClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDir={"column"}
            fontSize={15}
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <Box pl="3" pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection={"column"}
              padding={"10px 0px"}
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed.
              </Text>
              <Text
                pos={"relative"}
                top="28px"
                left="10px"
                width="20px"
                color={"gray.400"}
              >
                l/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size="sm"
                pl={22}
                onChange={onCommunityNameChange}
              />
              <Text
                color={charsRemaining < 5 ? "red" : "green.500"}
                fontSize={10}
              >
                {charsRemaining} Characters remaining.
              </Text>
              <Box>
                <Text fontSize="15" fontWeight={600}>
                  Community Type
                </Text>
                <Stack>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillPersonFill} mr="1" color={"gray.500"} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color={"gray.500"}>
                        (Anyone can view, post and comment to this community)
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillEyeFill} mr="1" color={"gray.500"} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color={"gray.500"}>
                        (Anyone can view this community, but only approved users
                        can post and comment to this community)
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={HiLockClosed} mr="1" color={"gray.500"} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color={"gray.500"}>
                        (Only approved users can view and submit to this
                        community)
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" border={"0px 0px 10px 10px"}>
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={handleClose}
              height={"30px"}
            >
              Cancel
            </Button>
            <Button height={"30px"}>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default CreateCommunityModal;
