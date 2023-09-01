import { BiUserCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "green.300" }}
      >
        <Flex align={"center"}>
          <Flex align={"center"}>
            {user ? (
              <>
                <Icon
                  as={BiUserCircle}
                  fontSize={24}
                  ml={1}
                  color={"green.300"}
                />
                <Flex
                  direction={"column"}
                  display={{ base: "none", lg: "flex" }}
                  fontSize={"8pt"}
                  align={"flex-start"}
                  mr="2"
                  ml="2"
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex mt="1" align={"center"}>
                    <Icon as={IoSparkles} color={"band.100"} mr="1" />
                    <Text color={"green.400"}>1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon
                fontSize={24}
                as={VscAccount}
                mr={1}
                color="gray.400"
                mt="1"
              />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              color={"green.300"}
              _hover={{ bg: "green.500", color: "white" }}
            >
              <Flex align={"center"}>
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              color={"green.300"}
              _hover={{ bg: "green.500", color: "white" }}
              onClick={() => {
                signOut(auth);
              }}
            >
              <Flex align={"center"}>
                <Icon as={MdOutlineLogout} fontSize={20} mr={2} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              color={"green.300"}
              _hover={{ bg: "green.500", color: "white" }}
              onClick={() => {
                setAuthModalState({ open: true, view: "login" });
              }}
            >
              <Flex align={"center"}>
                <Icon as={MdLogin} fontSize={20} mr={2} />
                Login / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;