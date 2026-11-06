import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { getMyPosts, deletePost } from "../../services/postService";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import { AppLayout } from "../../components/layout/AppLayout";
import { MyBlogCard } from "../../components/blog/MyBlogCard";

export const MyBlogsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || "",
  );

  // Load the current user's posts.
  useEffect(() => {
    let active = true;

    getMyPosts()
      .then((result) => {
        if (active) {
          setPosts(result);
          setError("");
        }
      })
      .catch((err) => {
        console.error("Failed to load my posts:", err);

        if (active) {
          setError("Unable to load your blogs. Please try again.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [retryCount]);

  const handleCreatePost = () => {
    navigate("/posts/new");
  };

  const handleEditPost = (post) => {
    navigate(`/posts/${post.id}/edit`, {
      state: { post },
    });
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);
    setActionError("");

    try {
      await deletePost(postToDelete.id);

      setPosts((previousPosts) =>
        previousPosts.filter((post) => post.id !== postToDelete.id),
      );

      setPostToDelete(null);
      setSuccessMessage("Post deleted successfully.");
    } catch (err) {
      console.error("Failed to delete post:", err);
      setActionError(
        "Unable to delete this post. Please check your permissions.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AppLayout>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box>
            <Typography component="h1" variant="h4" fontWeight={700}>
              My Blogs
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Manage your published stories.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleCreatePost}
            sx={{ textTransform: "none" }}
          >
            Create Post
          </Button>
        </Stack>

        {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        )}

        {actionError && (
          <Alert severity="error" onClose={() => setActionError("")}>
            {actionError}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  setLoading(true);
                  setRetryCount((count) => count + 1);
                }}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : !error && posts.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              No blogs yet
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Start sharing your ideas with the community.
            </Typography>

            <Button variant="contained" onClick={handleCreatePost}>
              Create your first post
            </Button>
          </Box>
        ) : !error ? (
          <>
            <Typography variant="body2" color="text.secondary">
              {posts.length} {posts.length === 1 ? "post" : "posts"} published
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                gap: 3,
              }}
            >
              {posts.map((post) => (
                <MyBlogCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={setPostToDelete}
                />
              ))}
            </Box>
          </>
        ) : null}
      </Stack>

      <Dialog
        open={Boolean(postToDelete)}
        onClose={() => !isDeleting && setPostToDelete(null)}
      >
        <DialogTitle>Delete blog post?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{postToDelete?.title}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPostToDelete(null)} disabled={isDeleting}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};
