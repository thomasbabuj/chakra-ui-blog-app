"use client";
import PageContent from "@/components/Layout/PageContent";
import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

type pageProps = {};

const Contact: React.FC<pageProps> = () => {
  return (
    <PageContent>
      <>
        <Flex
          direction={"column"}
          color={"white"}
          padding="6px 12px"
          justify={{ md: "space-between" }}
          p={5}
        >
          <Heading as="h2" size="xl" mb={4}>
            Contact Us
          </Heading>
        </Flex>
      </>
      <></>
    </PageContent>
  );
};
export default Contact;
