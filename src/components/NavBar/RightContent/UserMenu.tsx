import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSparkles } from "react-icons/io5";
import { MdLogin, MdOutlineLogout } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useSetRecoilState } from "recoil";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    setAuthModalState({ open: true, view: "login" });
    await signOut(auth);
    // clear user related states using recoil reset
  };

  const handleProfileOnClick = () => {
    router.push("/profile");
  };
  return (
    <>
      <AuthModal />
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
                    //align={"flex-start"}
                    mr="2"
                    ml="2"
                    h={10}
                    align={"center"}
                  >
                    <Flex mt="2" align={"center"}>
                      <Text fontWeight={700} fontSize={"10pt"}>
                        {user?.displayName || user.email?.split("@")[0]}
                      </Text>
                    </Flex>

                    {/* <Flex mt="1" align={"center"}>
                      <Icon as={IoSparkles} color={"band.100"} mr="1" />
                      <Text color={"green.400"}>1 karma</Text>
                    </Flex> */}
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
        <MenuList
          bgColor={"black"}
          fontSize={"10pt"}
          fontWeight={700}
          color={"green.300"}
        >
          {user ? (
            <>
              <MenuItem
                fontSize={"10pt"}
                fontWeight={700}
                bg={"black"}
                color={"green.300"}
                _hover={{ bg: "green.500", color: "white" }}
                onClick={handleProfileOnClick}
              >
                <Flex align={"center"}>
                  <Icon as={CgProfile} color="white" fontSize={20} mr={2} />
                  Profile
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                bg={"black"}
                fontSize={"10pt"}
                fontWeight={700}
                color={"green.300"}
                _hover={{ bg: "green.500", color: "white" }}
                onClick={logout}
              >
                <Flex align={"center"}>
                  <Icon
                    as={MdOutlineLogout}
                    color="white"
                    fontSize={20}
                    mr={2}
                  />
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
                bg={"black"}
              >
                <Flex align={"center"}>
                  <Icon as={MdLogin} fontSize={20} mr={2} />
                  Login
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                fontSize={"10pt"}
                fontWeight={700}
                color={"green.300"}
                _hover={{ bg: "green.500", color: "white" }}
                onClick={() => {
                  setAuthModalState({ open: true, view: "register" });
                }}
                bg={"black"}
              >
                <Flex align={"center"}>
                  <Icon as={BsFillPersonPlusFill} fontSize={20} mr={2} />
                  Register
                </Flex>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
export default UserMenu;
