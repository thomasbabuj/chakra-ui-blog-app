import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";
import Link from "next/link";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify="center" align="center">
        <Flex p="2">
          <Link href={"#"}>About</Link>
        </Flex>
        <Flex p="2">
          <Link href={"#"}>Page</Link>
        </Flex>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
