import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import { NavLink, Link as RouterLink } from "react-router";
import { Logo } from "../common/Logo";

const isActive = {
  color: "primary.main",
  fontWeight: 600,
};

export const Navbar = () => {
  return (
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
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
