import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TagInput from "./TagInput";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { User } from "firebase/auth";

type EditPorfileProps = {
  displayName?: string;
  interests?: string;
  user: User;
};

type EditProfileForm = {
  displayName: string;
  interests: string[];
};

const EditPorfile: React.FC<EditPorfileProps> = ({ user, interests }) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileForm>();
  const [tags, setTags] = useState<string[]>([]);
  const [hiddenInputValue, setHiddenInputValue] = useState<string>("");
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    setHiddenInputValue(newTags.join(","));
  };

  const onSubmit: SubmitHandler<EditProfileForm> = async (formData) => {
    if (tags.length === 0) {
      alert(`Interest fields canot be empty`);
      setError("interests", { type: "custom", message: "This is required" });
      return;
    }
    // Assuming 'user' is your authenticated user object and 'firestore' is your Firestore instance
    const userId = user?.uid;
    const userProfileDocRef = doc(
      collection(firestore, "users", userId, "profile")
    );

    // Data to update or create in the user's profile
    const userProfileData = {
      displayName: sanitizeInput(formData.displayName),
      interests: tags,
      updatedAt: serverTimestamp(),
    };

    try {
      // Check if the user profile document exists
      const userProfileSnapshot = await getDoc(userProfileDocRef);

      if (!userProfileSnapshot.exists()) {
        // If the profile document does not exist, create it
        await setDoc(userProfileDocRef, userProfileData);
        console.log("User profile document created successfully.");
      } else {
        // If the profile document exists, update it (only updates displayName and interests)
        await updateDoc(userProfileDocRef, {
          displayName: userProfileData.displayName,
          interests: userProfileData.interests,
          updatedAt: userProfileData.updatedAt,
        });
        console.log("User profile document updated successfully.");
      }
    } catch (error: any) {
      console.error("Error updating user profile document: ", error.message);
    }
  };

  useEffect(() => {
    setValue("displayName", user.displayName ?? "");
    setValue("interests", interests?.split(",") ?? []);
  }, [user, interests]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={"column"}
        bg="white"
        color={"black"}
        borderRadius={4}
        mt={2}
        p="5"
      >
        <FormControl isInvalid={errors.displayName}>
          <FormLabel>
            <Text fontWeight="700">Display Name</Text>
          </FormLabel>
          <Input
            id="displayName"
            {...register("displayName", {
              required: "This is required",
              minLength: {
                value: 2,
                message: "Minimum length should be 2",
              },
              maxLength: {
                value: 25,
                message: "Maximum length should be 25 Characters",
              },
            })}
            fontSize={"10pt"}
            borderRadius={"4"}
            borderColor={"black"}
            _placeholder={{
              color: "gray.500",
            }}
            _focus={{
              bg: "white",
              border: "1px solid",
              borderColor: "black",
            }}
          />
          <FormErrorMessage>
            {errors.displayName && errors.displayName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.interests}>
          <FormLabel>
            <Text fontWeight="700">Interests</Text>
          </FormLabel>
          {
            <Input
              id="interests"
              placeholder="add mulitple interests by spearating comma"
              {...register("interests", {
                minLength: {
                  value: 2,
                  message: "Minimum length should be 2",
                },
              })}
              fontSize={"10pt"}
              borderRadius={"4"}
              borderColor={"black"}
              _placeholder={{
                color: "gray.500",
              }}
              _focus={{
                bg: "white",
                border: "1px solid",
                borderColor: "black",
              }}
              value={hiddenInputValue}
            />
          }
          <FormErrorMessage>
            {errors.interests && errors.interests.message}
          </FormErrorMessage>
        </FormControl>
        <TagInput tags={tags} onChange={handleTagsChange} />

        <Flex>
          <Box></Box>
          <Spacer />
          <Box>
            <FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Save
              </Button>
            </FormControl>
          </Box>
        </Flex>
      </Flex>
    </form>
  );
};
export default EditPorfile;
