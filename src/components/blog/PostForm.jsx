import { useState } from "react";

import { Button, Stack, TextField, Typography } from "@mui/material";

const TITLE_MAX_LENGTH = 120;
const CONTENT_MAX_LENGTH = 10000;

const EMPTY_FORM = {
  title: "",
  content: "",
};

const validatePost = ({ title, content }) => {
  const errors = {};

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle) {
    errors.title = "Post title is required.";
  } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
    errors.title = `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`;
  }

  if (!trimmedContent) {
    errors.content = "Post content is required.";
  } else if (trimmedContent.length > CONTENT_MAX_LENGTH) {
    errors.content = `Content cannot exceed ${CONTENT_MAX_LENGTH} characters.`;
  }

  return errors;
};

export const PostForm = ({
  initialValues = EMPTY_FORM,
  submitLabel = "Publish Post",
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: initialValues.title ?? "",
    content: initialValues.content ?? "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Revalidate after the user starts correcting an error.
    if (errors[name]) {
      setErrors(validatePost(updatedFormData));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validatePost(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" spacing={3} onSubmit={handleSubmit}>
      {/* Title */}
      <Stack spacing={1}>
        <TextField
          name="title"
          label="Post title"
          placeholder="Enter an engaging title"
          value={formData.title}
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={
            errors.title ||
            `${formData.title.length}/${TITLE_MAX_LENGTH} characters`
          }
          fullWidth
          required
          slotProps={{
            htmlInput: {
              maxLength: TITLE_MAX_LENGTH,
            },
          }}
        />
      </Stack>

      {/* Content */}
      <Stack spacing={1}>
        <TextField
          name="content"
          label="Your story"
          placeholder="Start writing your story..."
          value={formData.content}
          onChange={handleChange}
          error={Boolean(errors.content)}
          helperText={
            errors.content ||
            `${formData.content.length}/${CONTENT_MAX_LENGTH} characters`
          }
          multiline
          minRows={12}
          fullWidth
          required
          slotProps={{
            htmlInput: {
              maxLength: CONTENT_MAX_LENGTH,
            },
          }}
        />

        <Typography variant="caption" color="text.secondary">
          Share your thoughts using plain text.
        </Typography>
      </Stack>

      {/* Form actions */}
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        justifyContent="flex-end"
        spacing={2}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={onCancel}
          disabled={isSubmitting}
          sx={{
            textTransform: "none",
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            textTransform: "none",
            px: 3,
          }}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </Stack>
    </Stack>
  );
};
