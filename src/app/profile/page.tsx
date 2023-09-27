"use client";
import PageContent from "@/components/Layout/PageContent";
import NotAuthorized from "@/components/NotAuthorized";
import { auth } from "@/firebase/clientApp";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type pageProps = {};

const Profile: React.FC<pageProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <PageContent>
          <>
            <Box p="14px 0px" borderBottom="1px solid" mb="2">
              <Heading as="h2" size="xl" mb={4}>
                Profile
              </Heading>
            </Box>
          </>
          <></>
        </PageContent>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};
export default Profile;
