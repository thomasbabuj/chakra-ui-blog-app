import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  Center,
  useColorModeValue,
  Avatar,
  Heading,
  Stack,
  Badge,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import EditPorfile from "./EditPorfile";

type UserProfileProps = {};

const UserProfile: React.FC<UserProfileProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const isUserHasPasswordProvider = user?.providerData.some(
    (data) => data.providerId === "password"
  );

  const displayName = user?.displayName || user?.email?.split("@")[0];
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [interests, setIntersts] = useState("");

  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${displayName}`}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {displayName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user?.email}
        </Text>
        {/* <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          Actress, musician, songwriter and artist. PM for work inquires or{" "}
          <Text color={"blue.400"}>#tag</Text> me in your posts
        </Text> */}

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #music
          </Badge>
        </Stack>

        {isUserHasPasswordProvider && (
          <Stack mt={8} direction={"column"} spacing={4} alignItems={"center"}>
            <Button
              variant={"ghost"}
              _hover={{
                bg: "brand.100",
                color: "white",
              }}
              onClick={() => {
                setShowEditProfile(!showEditProfile);
              }}
              bg={"brand.100"}
              color={"black"}
            >
              Edit Profile
            </Button>
            <Button
              variant={"ghost"}
              _hover={{
                bg: "brand.100",
                color: "white",
              }}
              onClick={() => {
                setAuthModalState({ open: true, view: "resetPassword" });
              }}
              bg={"gray.600"}
              color={"black"}
            >
              Reset Password
            </Button>
          </Stack>
        )}

        {showEditProfile && (
          <Stack>
            {user && (
              <EditPorfile
                user={user}
                displayName={displayName}
                interests={interests}
              />
            )}
          </Stack>
        )}
      </Box>
    </Center>
  );
};
export default UserProfile;
