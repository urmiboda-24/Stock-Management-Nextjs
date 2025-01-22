import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("*Email is required").email("Invalid email"),
  password: Yup.string().required("*Password is required"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().required("*Email is required").email("Invalid email"),
  password: Yup.string()
    .required("*Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one digit, and one special character"
    ),
  fullName: Yup.string()
    .required("*Full name is required")
    .matches(/^[^0-9]*$/, "Full name must not contain digits"),
  confirmPassword: Yup.string()
    .required("*Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const transactionSchema = Yup.object().shape({
  bill_for: Yup.string().required("Please enter bill name"),
  status: Yup.string().required("Please select status"),
});
