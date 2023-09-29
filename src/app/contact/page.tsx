"use client";
import PageContent from "@/components/Layout/PageContent";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type pageProps = {};

type ContactFormProps = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC<pageProps> = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<ContactFormProps> = async (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSuccess(true);
        reset();
        resolve();
      }, 3000);
    });
  };

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" mb="2">
          <Heading as="h2" size="xl" mb={4}>
            Contact Us
          </Heading>
        </Box>
        <Flex
          direction={"column"}
          color={"white"}
          padding="6px 12px"
          justify={{ md: "space-between" }}
          p={5}
        >
          {success && (
            <Flex justify="center">
              <Box>
                <Text fontWeight="700" color="brand.100">
                  Thank you for your message. We get back to you soon.
                </Text>
              </Box>
            </Flex>
          )}
          <Flex
            direction={"column"}
            bg="white"
            color={"black"}
            borderRadius={4}
            mt={2}
            p={5}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <Input
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                  border={"1px solid black"}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black.500",
                  }}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="name">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="email"
                  type="email"
                  {...register("email", {
                    required: "This is required",
                  })}
                  border={"1px solid black"}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black.500",
                  }}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.message}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  placeholder="Message"
                  {...register("message", {
                    required: "This is required",
                  })}
                  border={"1px solid black"}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black.500",
                  }}
                />
                <FormErrorMessage>
                  {errors.message && errors.message.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Flex>
        </Flex>
      </>
      <></>
    </PageContent>
  );
};
export default Contact;
