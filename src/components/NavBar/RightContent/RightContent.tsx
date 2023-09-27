import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import Link from "next/link";
import React from "react";
import Icons from "./Icons";
import UserMenu from "./UserMenu";
import Directory from "../Directory/Directory";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify="center" align="center">
        <Flex p="2">
          <Directory />
        </Flex>
        <Flex p="2">
          <Link href={"/about"}>About</Link>
        </Flex>
        <Flex p="2">
          <Link href={"/contact"}>Contact</Link>
        </Flex>
        {user && <Icons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
