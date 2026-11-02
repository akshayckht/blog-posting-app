import { Box, Button, Stack, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { validateLogin } from "../../utils/authValidation";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleSubmit = (event) => {
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

    //firebase login will be implemented
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: true,
      });
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
