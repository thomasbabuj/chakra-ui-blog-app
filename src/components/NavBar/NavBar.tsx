"use client";

import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchInput from "../SearchInput";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";

const NavBar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg="black"
      h="44px"
      padding="6px 12px"
      color="white"
      justify={{ md: "space-between" }}
    >
      {/* Logo Starts  */}
      <Flex
        align="center"
        width={{ base: "30px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image
          src="./images/favicon-liko.png"
          height="30px"
          display={{ md: "none" }}
        />
        <Image
          src="./images/likobuzz-logo.png"
          height="30px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* Logo Ends  */}

      {user && <Directory />}
      {/* Search Inputs */}
      <SearchInput user={user} />

      <RightContent user={user} />
    </Flex>
  );
};
export default NavBar;
