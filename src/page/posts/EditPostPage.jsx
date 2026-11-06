import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";

import { AppLayout } from "../../components/layout/AppLayout";
import { PostForm } from "../../components/blog/PostForm";
import { mockPosts } from "../../data/mockData";

export const EditPostPage = () => {
  const { postId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const [submitNotice, setSubmitNotice] = useState("");

  // Prefer the post passed from My Blogs.
  // Fall back to mock data to support direct URL access.
  const post =
    location.state?.post?.id === postId
      ? location.state.post
      : mockPosts.find((item) => item.id === postId);

  const handleUpdatePost = async (updatedData) => {
    // Temporary: Firestore update integration will be added next.
    console.log("Post ID:", postId);
    console.log("Updated post:", updatedData);

    setSubmitNotice(
      "Form validation successful. Firestore updating will be connected next.",
    );
  };

  const handleCancel = () => {
    navigate("/my-blogs");
  };

  if (!post) {
    return (
      <AppLayout>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h5" fontWeight={700}>
            Post not found
          </Typography>

          <Typography color="text.secondary">
            The post you're trying to edit does not exist.
          </Typography>

          <Button variant="contained" onClick={handleCancel}>
            Back to My Blogs
          </Button>
        </Stack>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 850, mx: "auto" }}>
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h4" fontWeight={700}>
              Edit Post
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Make changes to your existing story.
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
                title: post.title,
                content: post.content,
              }}
              submitLabel="Save Changes"
              onSubmit={handleUpdatePost}
              onCancel={handleCancel}
            />
          </Paper>
        </Stack>
      </Box>
    </AppLayout>
  );
};
