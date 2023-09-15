import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
  currentImage?: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  currentImage,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex justify={"center"} align={"center"} width={"100%"}>
      {selectedFile ? (
        <>
          <Flex direction={"column"} align="center">
            <Image src={selectedFile} maxW="400px" maxH="400px" />
            <Stack direction={"row"} mt="4">
              <Button
                height={"28px"}
                onClick={() => setSelectedFile("")}
                variant={"outline"}
              >
                Remove
              </Button>
            </Stack>
          </Flex>
        </>
      ) : (
        <Flex
          justify={"center"}
          align={"center"}
          p="20"
          border="2px dashed"
          width={"100%"}
          borderRadius={4}
        >
          <Button
            variant={"outline"}
            height={"28px"}
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
