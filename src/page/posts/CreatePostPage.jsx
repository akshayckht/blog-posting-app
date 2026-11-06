import { useState } from "react";
import { useNavigate } from "react-router";

import { Alert, Box, Paper, Stack, Typography } from "@mui/material";

import { AppLayout } from "../../components/layout/AppLayout";
import { PostForm } from "../../components/blog/PostForm";
import { createPost } from "../../services/postService";

export const CreatePostPage = () => {
  const navigate = useNavigate();

  const [submitNotice, setSubmitNotice] = useState("");

 const handleCreatePost = async (postData) => {
  setSubmitNotice("");

  try {
    await createPost(postData);

    navigate("/my-blogs", {
      state: {
        successMessage: "Your post was published successfully.",
      },
    });
  } catch (error) {
    console.error("Failed to create post:", error);

    setSubmitNotice(
      error.code === "permission-denied"
        ? "You don't have permission to publish this post. Check your Firestore rules."
        : error.message || "Unable to publish your post."
    );
  }
};

  const handleCancel = () => {
    navigate("/my-blogs");
  };

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 850, mx: "auto" }}>
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h4" fontWeight={700}>
              Create a Post
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Turn your ideas into something worth sharing.
            </Typography>
          </Box>

          {submitNotice && <Alert severity="info">{submitNotice}</Alert>}

          <Paper
            variant="outlined"
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              borderColor: "divider",
            }}
          >
            <PostForm
              initialValues={{
                title: "",
                content: "",
              }}
              submitLabel="Publish Post"
              onSubmit={handleCreatePost}
              onCancel={handleCancel}
            />
          </Paper>
        </Stack>
      </Box>
    </AppLayout>
  );
};
