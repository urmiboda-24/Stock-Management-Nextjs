"use client";
import { IRegister } from "@/interface/auth";
import { registerSchema } from "@/utils/schema";
import {
  FormLabel,
  TextField,
  FormControlLabel,
  Typography,
  styled,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
const initialValue = {
  email: "",
  password: "",
  fullName: "",
  confirmPassword: "",
};
const Register = () => {
  const { handleSubmit, touched, errors, getFieldProps, values, isValid } =
    useFormik({
      initialValues: initialValue,
      validationSchema: registerSchema,
      onSubmit: (values: IRegister) => {
        console.log(values);
      },
    });

  return (
    <SignUpWrapper>
      <SignUpContainer>
        <SignInTypo>Create an account</SignInTypo>
        <form onSubmit={handleSubmit}>
          <FieldContainer>
            <FormLabel>Full Name</FormLabel>
            <TextField
              {...getFieldProps("fullName")}
              fullWidth
              name="fullName"
              variant="outlined"
              placeholder="Enter Your Full Name"
              error={Boolean(errors.fullName) && touched.fullName}
              helperText={(touched.fullName && errors.fullName)?.toString()}
            />
          </FieldContainer>
          <FieldContainer>
            <FormLabel>Your Email</FormLabel>
            <TextField
              {...getFieldProps("email")}
              type="email"
              name="email"
              fullWidth
              variant="outlined"
              placeholder="example@company.com"
              error={Boolean(errors.email) && touched.email}
              helperText={(touched.email && errors.email)?.toString()}
            />
          </FieldContainer>
          <FieldContainer>
            <FormLabel>Your Password</FormLabel>
            <TextField
              {...getFieldProps("password")}
              type="password"
              fullWidth
              name="password"
              variant="outlined"
              placeholder="Password"
              error={Boolean(errors.password) && touched.password}
              helperText={(touched.password && errors.password)?.toString()}
            />
          </FieldContainer>
          <FieldContainer>
            <FormLabel>Confirm Password</FormLabel>
            <TextField
              {...getFieldProps("confirmPassword")}
              type="password"
              fullWidth
              name="confirmPassword"
              variant="outlined"
              placeholder="Confirm Password"
              error={Boolean(errors.confirmPassword) && touched.confirmPassword}
              helperText={(
                touched.confirmPassword && errors.confirmPassword
              )?.toString()}
            />
          </FieldContainer>
          <FormControlLabel
            control={<CustomCheckBox defaultChecked />}
            label="I agree to the terms and conditions"
          />
          <SignUpButton type="submit">Sign up</SignUpButton>
        </form>
        <RegisteredTypo>
          Already have an account?{" "}
          <CreateAccountSpan href={"/login"}>Login Here</CreateAccountSpan>
        </RegisteredTypo>
      </SignUpContainer>
    </SignUpWrapper>
  );
};

export default Register;

const SignUpWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "0 20px",
});

const SignUpContainer = styled(Box)({
  maxWidth: "500px",
  width: "100%",
  boxShadow: "0px 1px 20px 3px #888888",
  padding: "24px",
});

const SignInTypo = styled(Typography)({
  textAlign: "center",
  fontSize: "32px",
  color: "#262b40",
  fontWeight: 600,
});

const SignUpButton = styled(Button)({
  fontSize: "16px",
  textTransform: "none",
  border: "1px solid #262b40",
  backgroundColor: "#262b40",
  color: "#fff",
  fontWeight: 600,
  marginTop: "20px",
  width: "100%",
});

const RegisteredTypo = styled(Typography)({
  textAlign: "center",
  marginTop: "20px",
});

const CreateAccountSpan = styled(Link)({
  color: "#262b40",
  fontWeight: 600,
  cursor: "pointer",
});

const CustomCheckBox = styled(Checkbox)({
  color: "#262b40",
  "&.Mui-checked": {
    color: "#262b40",
  },
});

const FieldContainer = styled(Box)({
  marginTop: "20px",
});
