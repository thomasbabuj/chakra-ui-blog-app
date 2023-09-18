import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

type SinglePostLoaderProps = {};

const SinglePostLoader: React.FC<SinglePostLoaderProps> = () => {
  return (
    <Stack spacing={6}>
      <Box>
        <Skeleton height="20px" mt="4" />
        <Skeleton height="20px" mt="4" />
        <Skeleton height="20px" mt="4" />
      </Box>
    </Stack>
  );
};
export default SinglePostLoader;
