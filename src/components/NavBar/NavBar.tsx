"use client";

import { auth } from "@/firebase/clientApp";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
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
      h="100px"
      padding="6px 12px"
      color="white"
      justify={{ md: "space-between" }}
      borderColor={"green.300"}
      borderBottom="1px solid #e5e7eb"
    >
      {/* Logo Starts  */}
      <Flex
        align="center"
        width={{ base: "100px", md: "auto" }}
        mr={{ base: 2, md: 4 }}
      >
        <Box display={{ md: "none" }}>
          <Link href="/">
            <Image
              src="/images/favicon-liko.png"
              height={20}
              alt="Likobuzz logo"
              width={150}
              placeholder="empty"
            />
          </Link>
        </Box>
        <Box display={{ base: "none", md: "unset" }}>
          <Link href="/">
            <Image
              src="/images/likobuzz-logo.png"
              height="20"
              alt="Likobuzz logo"
              width={150}
              placeholder="empty"
            />
          </Link>
        </Box>
      </Flex>
      {/* Logo Ends  */}

      <Flex align={"center"}>{user && <Directory />}</Flex>

      {/* Search Inputs */}
      {/* <SearchInput user={user} /> */}

      <RightContent user={user} />
    </Flex>
  );
};
export default NavBar;
