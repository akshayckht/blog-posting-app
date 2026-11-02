import { Box, Container, Paper, Stack } from "@mui/material";
import { Logo } from "../common/Logo";


export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#d9d9d9",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} sx={{alignItems: "center"}}>
          <Logo />
          <Paper
            component="main"
            elevation={0}
            sx={{
              width: "100%",
              p: { xs: 3, sm: 4 },
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              bgcolor: "#FFFFFF",
            }}
          >
            {children}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};
