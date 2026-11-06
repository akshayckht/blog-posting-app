const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[d])(?=.*[!@#$%^&*]).{8,}$/;

//Login form validation
export const validateLogin = (formData) => {
  const errors = {};

  //email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  //password validation
  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateSignup = (formData) => {
  const errors = {};

  //name validation
  if (!formData.fullName.trim()) {
    errors.fullName = "Name required";
  }

  //email validation
  if (!formData.email.trim()) {
    errors.email = "Email required";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Please Enter a valid email address";
  }

  //password validation
  if (!formData.password) {
    errors.password = "Password required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must contain at lest 8 characters";
  }

  //confirm password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }

  return errors;
};
