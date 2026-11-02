import { Box, Container } from "@mui/material";
import { Navbar } from "./Navbar";

export const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "Background.default",
      }}
    >
      <Navbar />

      <Box component="main">
        <Container
          maxWidth="lg"
          sx={{
            py: {
              xs: 3,
              sm: 4,
              md: 5,
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
