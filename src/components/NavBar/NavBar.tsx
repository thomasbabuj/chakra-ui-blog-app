"use client";

import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "../SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const NavBar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="black" h="60px" padding="10px 15px" color="white">
      {/* Logo Starts  */}
      <Flex align="center">
        <Image
          src="./images/favicon-liko.png"
          height="40px"
          display={{ md: "none" }}
        />
        <Image
          src="./images/likobuzz-logo.png"
          height="40px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* Logo Ends  */}
      {/* Search Inputs */}
      <SearchInput user={user} />

      <RightContent user={user} />
    </Flex>
  );
};
export default NavBar;
