import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Stack,
  Button,
  Avatar,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { NavLink, Link as RouterLink, useNavigate } from "react-router";
import { Logo } from "../common/Logo";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { logOut } from "../../services/authService";

const isActive = {
  color: "primary.main",
  fontWeight: 600,
};

export const Navbar = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const context = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out failed", error);
      setSignOutError("Unable to sign out. Please try again.");
    } finally {
      isSigningOut(false);
    }
  };

  return (
    <>
      <AppBar
        component="header"
        position="static"
        color="inherit"
        elevation={1}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, sm: 76 },
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              py: 1,
            }}
          >
            {/* logo */}
            <Box component={RouterLink} to="/posts">
              <Logo />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Stack component="nav" direction="row" spacing={0.5}>
              <Button
                component={NavLink}
                to="/posts"
                variant="text"
                sx={{
                  "&.active": isActive,
                }}
              >
                Explore
              </Button>

              <Button component={NavLink} sx={{ textTransform: "none" }}>
                My Blogs
              </Button>

              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  fontSize: 14,
                }}
              ></Avatar>

              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {context.user?.displayName || context.user?.email}
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Snackbar
        open={Boolean(signOutError)}
        autoHideDuration={5000}
        onClose={() => setSignOutError("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error" onClose={() => setSignOutError("")}>
          {signOutError}
        </Alert>
      </Snackbar>
    </>
  );
};
