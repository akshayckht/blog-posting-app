

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

// Supports Firestore Timestamp and JavaScript date values.
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
    month: "short",
    year: "numeric",
  }).format(date);
};

export const MyBlogCard = ({ post, onEdit, onDelete }) => {
  const authorName = post.authorName?.trim() || "You";

  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        borderColor: "divider",
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s ease",

        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Stack spacing={2}>
          <Typography
            component="h2"
            variant="h6"
            fontWeight={700}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {authorName.charAt(0).toUpperCase()}
            </Avatar>

            <Stack spacing={0}>
              <Typography variant="body2" fontWeight={600}>
                {authorName}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Published {formatDate(post.createdAt)}
              </Typography>
            </Stack>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: "pre-line",
              lineHeight: 1.7,
            }}
          >
            {post.content}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          px: 2.5,
          pb: 2,
          pt: 0,
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={() => onEdit(post)}
          sx={{ textTransform: "none" }}
        >
          Edit Post
        </Button>

        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onDelete(post)}
          sx={{ textTransform: "none" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
