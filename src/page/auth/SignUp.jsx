import { useState } from "react";
import { AuthLayout } from "../../components/auth/AuthLayout";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Link,
  Button,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { validateSignup } from "../../utils/authValidation";
import { registerUser } from "../../services/authService";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateSignup(formData);

    setErrors(validationErrors);

    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Registration failed", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setAuthError("An account with email id already exist");
          break;

        case "auth/invalid-email":
          setAuthError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setAuthError("Your password is too weak.");
          break;

        case "auth/network-request-failed":
          setAuthError("Network error. Please try again.");
          break;

        default:
          setAuthError("Unable to create your account. Please try again.");
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
      setErrors(validateSignup(formData));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    setErrors(validateSignup(formData));
  };

  return (
    <AuthLayout>
      <Stack spacing={3}>
        <Box>
          {/* page heading */}
          <Typography
            component="h1"
            variant="h5"
            fontWeight={700}
            color="textPrimary"
          >
            Crete your account
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Join the community and start sharing your ides
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {/* create account form */}
          <Stack spacing={2.5}>

            {/* auth alerts */}
            {authError && <Alert severity="error">{authError}</Alert>}

            <TextField
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && errors.fullName}
              helperText={
                touched.fullName && errors.fullName ? errors.fullName : " "
              }
              fullWidth
            />

            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email ? errors.email : " "}
            />

            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              helperText={
                touched.password && errors.password ? errors.password : " "
              }
            />

            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
              helperText={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : " "
              }
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </Stack>
        </Box>

        <Box>
          {/* Sign in navigation */}
          <Typography>
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              fontWeight={600}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Stack>
    </AuthLayout>
  );
};
