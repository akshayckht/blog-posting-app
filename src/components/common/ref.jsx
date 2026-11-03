import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

// Convert Firestore Timestamp, Date, or date string to JavaScript Date.
const toDate = (value) => {
  if (!value) return null;

  const date =
    typeof value.toDate === "function"
      ? value.toDate()
      : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

// Format a date for display.
const formatDate = (value) => {
  const date = toDate(value);

  if (!date) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const BlogCard = ({ post, onReadMore }) => {
  const authorName = post.authorName?.trim() || "Inkspire member";

  const createdDate = toDate(post.createdAt);
  const updatedDate = toDate(post.updatedAt);

  const isEdited =
    createdDate &&
    updatedDate &&
    updatedDate.getTime() > createdDate.getTime();

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
      <CardContent
        sx={{
          p: 2.5,
          flexGrow: 1,
          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        <Stack spacing={2}>
          {/* Blog title */}
          <Typography
            component="h2"
            variant="h6"
            fontWeight={700}
            color="text.primary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </Typography>

          {/* Author information */}
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
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.primary"
              >
                {authorName}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Published {formatDate(post.createdAt)}
              </Typography>
            </Stack>
          </Stack>

          {/* Updated date */}
          {isEdited && (
            <Typography variant="caption" color="text.secondary">
              Edited {formatDate(post.updatedAt)}
            </Typography>
          )}

          {/* Content preview */}
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

      {/* Read more action */}
      <CardActions
        sx={{
          px: 2.5,
          pb: 2,
          pt: 0,
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="small"
          variant="text"
          onClick={() => onReadMore(post)}
          sx={{
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};