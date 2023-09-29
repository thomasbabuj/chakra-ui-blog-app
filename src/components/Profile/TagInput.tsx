import React, { useState } from "react";
import { Input, Flex, Box, CloseButton } from "@chakra-ui/react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [tagInput, setTagInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tagInput.trim()) {
        const newTags = [...tags, tagInput.trim()];
        onChange(newTags);
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <Flex flexWrap="wrap" bg="white" color={"black"}>
      <Input
        placeholder="Add tags..."
        value={tagInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        mt="3"
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
        mb="3"
      />
      {tags.map((tag) => (
        <Box key={tag} mr={2} mb={2} position="relative">
          <Box
            as="span"
            px={5}
            py={2}
            bg="blue.500"
            color="white"
            borderRadius="full"
            cursor="pointer"
          >
            {tag}
          </Box>
          <CloseButton
            size="sm"
            position="absolute"
            right="-2px"
            top="-9px"
            onClick={() => handleTagRemove(tag)}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default TagInput;
