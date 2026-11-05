import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { validateLogin } from "../../utils/authValidation";
import { loginUser } from "../../services/authService";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateLogin(formData);

    setTouched({
      email: true,
      password: true,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });

      navigate("/posts", { replace: true });
    } catch (error) {
      console.log("Log in failed", error.code);

      // 4. Handle Firebase errors
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setAuthError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setAuthError("Please enter a valid email address.");
          break;

        case "auth/user-disabled":
          setAuthError("This account has been disabled.");
          break;

        case "auth/too-many-requests":
          setAuthError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setAuthError("Network error. Please check your connection.");
          break;

        case "auth/operation-not-allowed":
          setAuthError("Email/password authentication is not enabled.");
          break;

        default:
          setAuthError("Unable to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      setErrors(validateLogin(formData));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors(validateLogin(formData));
  };

  return (
    <AuthLayout>
      <Stack spacing={3}>
        {/* page heading */}
        <Box>
          <Typography
            component="h1"
            variant="h5"
            fontWeight={700}
            color="textPrimary"
          >
            Welcome Back
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Sign in to continue
          </Typography>
        </Box>

        {/* login form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* auth errors */}
            {authError && <Alert severity="error">{authError}</Alert>}

            <TextField
              id="email"
              name="email"
              label="Email address"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email ? errors.email : " "}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              helperText={
                touched.password && errors.password ? errors.password : " "
              }
              fullWidth
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              disabled={isSubmitting}
              sx={{
                py: 1.4,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>

        <Box>
          {/* registration navigation */}
          <Typography>
            Don,t have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              fontWeight={700}
            >
              Create account
            </Link>
          </Typography>
        </Box>
      </Stack>
    </AuthLayout>
  );
};
