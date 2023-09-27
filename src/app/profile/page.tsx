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
            <Heading as="h4" size={"sm"}>
              Profile
            </Heading>
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
