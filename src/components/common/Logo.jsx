import { Box, Typography } from "@mui/material";

export const Logo = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        component="p"
        variant="h4"
        fontWeight={700}
        letterSpacing="-0.04em"
        sx={{ color: "#3f50b5" }}
      >
        Inkspire
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Ideas Worth Sharing
      </Typography>
    </Box>
  );
};
