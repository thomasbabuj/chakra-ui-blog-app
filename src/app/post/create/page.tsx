"use client";

import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type CreatePostPageProps = {};

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid">
          <Text fontWeight={700}>Create a Post</Text>
        </Box>
        {/* NewPost Form */}
        <NewPostForm />
      </>
      <>RHS</>
    </PageContent>
  );
};
export default CreatePostPage;
