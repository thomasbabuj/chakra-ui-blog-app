"use client";

import { Box, Flex, IconButton, Image, Link, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="black" color="white" borderTop="1px solid">
      <Flex
        maxW="container.lg"
        mx="auto"
        flexDirection={["column"]}
        justifyContent="space-between"
        alignItems="center"
        p={5}
      >
        {/* Company Logo */}
        <Image
          src="/images/likobuzz-logo.png"
          alt="Likobuzz logo"
          w="100px"
          h="auto"
          pb="2"
        />

        {/* Company Bio */}
        <Text fontSize="lg" mt={[4, 0]} textAlign={["center"]} pb="2">
          The ultimate discussion corner for the latest Filipino buzz
          enthusiasts!
        </Text>

        {/* Navigation Links */}
        <Flex
          mt={[4, 0]}
          justifyContent={["center", "flex-end"]}
          flexDirection={["column", "row"]}
          alignItems={["center", "flex-end"]}
          fontSize={"10pt"}
          pb="2"
        >
          <Link fontSize="lg" mb={[2, 0]} mr={[0, 4]}>
            Home
          </Link>
          <Link fontSize="lg" mb={[2, 0]} mr={[0, 4]}>
            About
          </Link>
          <Link fontSize="lg" mb={[2, 0]} mr={[0, 4]}>
            Contact
          </Link>
          <Link fontSize="lg" mb={[2, 0]} mr={[0, 4]}>
            Privacy Policy
          </Link>
          <Link fontSize="lg" mb={[2, 0]} mr={[0, 4]}>
            TnC
          </Link>
        </Flex>

        {/* Social Media Icons */}
        <Flex mt={[4, 0]}>
          <IconButton
            as={Link}
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            icon={<FaFacebook />}
            fontSize="24px"
            color="white"
            mr={2}
          />
          <IconButton
            as={Link}
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            icon={<FaTwitter />}
            fontSize="24px"
            color="white"
            mr={2}
          />
          <IconButton
            as={Link}
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            fontSize="24px"
            color="white"
            mr={2}
          />
          <IconButton
            as={Link}
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
            icon={<FaInstagram />}
            fontSize="24px"
            color="white"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
