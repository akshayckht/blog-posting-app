import { Box, CircularProgress } from "@mui/material";

import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, authLoading } = useAuth();

  const location = useLocation();

  if (authLoading) {
    return (
      <Box
        role="status"
        aria-label="Checking authentication"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
