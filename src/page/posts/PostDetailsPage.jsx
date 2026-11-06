import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AppLayout } from "../../components/layout/AppLayout";
import { getPostById } from "../../services/postService";

// Format Firestore Timestamp or JavaScript Date.
const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date =
    typeof value.toDate === "function"
      ? value.toDate()
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const PostDetailsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    postId: null,
    loading: true,
    post: null,
    error: "",
  });

  useEffect(() => {
    let active = true;

    const fetchPost = async () => {
      try {
        const result = await getPostById(postId);

        if (active) {
          setRequest({
            postId,
            loading: false,
            post: result,
            error: "",
          });
        }
      } catch (error) {
        console.error("Failed to retrieve post:", error);

        if (active) {
          setRequest({
            postId,
            loading: false,
            post: null,
            error: "Unable to load this post. Please try again.",
          });
        }
      }
    };

    fetchPost();

    return () => {
      active = false;
    };
  }, [postId]);

  // Avoid displaying an old post when the URL changes.
  const loading =
    request.loading || request.postId !== postId;

  const post =
    request.postId === postId ? request.post : null;

  if (loading) {
    return (
      <AppLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 10,
          }}
        >
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  if (request.error || !post) {
    return (
      <AppLayout>
        <Stack spacing={2} alignItems="flex-start">
          <Alert severity={request.error ? "error" : "warning"}>
            {request.error || "This blog post could not be found."}
          </Alert>

          <Button
            variant="contained"
            onClick={() => navigate("/posts")}
          >
            Back to Explore
          </Button>
        </Stack>
      </AppLayout>
    );
  }

  const authorName =
    post.authorName?.trim() || "Inkspire member";

  const createdDate = formatDate(post.createdAt);
  const updatedDate = formatDate(post.updatedAt);

  const createdTime =
    post.createdAt?.toDate?.().getTime() ??
    new Date(post.createdAt).getTime();

  const updatedTime =
    post.updatedAt?.toDate?.().getTime() ??
    new Date(post.updatedAt).getTime();

  const isEdited =
    Number.isFinite(createdTime) &&
    Number.isFinite(updatedTime) &&
    updatedTime > createdTime;

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 850, mx: "auto" }}>
        <Stack spacing={3}>
          <Button
            onClick={() => navigate("/posts")}
            sx={{
              alignSelf: "flex-start",
              textTransform: "none",
            }}
          >
            ← Back to Explore
          </Button>

          <Paper
            variant="outlined"
            sx={{
              p: { xs: 2.5, sm: 4, md: 5 },
              borderRadius: 3,
              borderColor: "divider",
            }}
          >
            <Stack spacing={3}>
              {/* Blog title */}
              <Typography
                component="h1"
                variant="h3"
                fontWeight={700}
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.4rem",
                  },
                  lineHeight: 1.3,
                  overflowWrap: "anywhere",
                }}
              >
                {post.title}
              </Typography>

              {/* Author information */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  {authorName.charAt(0).toUpperCase()}
                </Avatar>

                <Stack spacing={0.3}>
                  <Typography fontWeight={600}>
                    {authorName}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Published {createdDate}
                  </Typography>

                  {isEdited && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Updated {updatedDate}
                    </Typography>
                  )}
                </Stack>
              </Stack>

              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              />

              {/* Full blog content */}
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                  overflowWrap: "anywhere",
                }}
              >
                {post.content}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </AppLayout>
  );
};