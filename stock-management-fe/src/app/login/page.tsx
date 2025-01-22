"use client";
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
import { loginSchema } from "@/utils/schema";
import { ILoginPayload } from "@/utils/interface/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginUser } from "@/store/thunk/auth";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { handleSubmit, touched, errors, getFieldProps, values, isValid } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: async (values: ILoginPayload) => {
        const response = await dispatch(loginUser(values));
        const { data, success, token } = response.payload;
        if (success) {
          Cookies.set("token", token);
          if (data[0].email.includes("admin")) {
            Cookies.set("role", "admin");
            router.push("/adminDashboard");
          } else {
            Cookies.set("role", "user");
            router.push("/userDashboard");
          }
        }
      },
    });

  return (
    <LoginWrapper>
      <LoginContainer>
        <SignInTypo>Sign in to our platform</SignInTypo>
        <form onSubmit={handleSubmit}>
          <FiledContainer>
            <FormLabel>Your Email</FormLabel>
            <TextField
              {...getFieldProps("email")}
              type="email"
              fullWidth
              variant="outlined"
              placeholder="example@company.com"
              error={Boolean(errors.email) && touched.email}
              helperText={touched.email && errors.email?.toString()}
            />
          </FiledContainer>
          <FiledContainer>
            <FormLabel>Your Password</FormLabel>
            <TextField
              {...getFieldProps("password")}
              type="password"
              fullWidth
              variant="outlined"
              placeholder="Password"
              error={Boolean(errors.password) && touched.password}
              helperText={touched.password && errors.password?.toString()}
            />
          </FiledContainer>
          <RememberLostBox>
            <FormControlLabel
              control={<CustomCheckBox defaultChecked />}
              label="Remember Me"
            />
            <Typography>Lost Password?</Typography>
          </RememberLostBox>
          <LoginButton type="submit" disabled={!isValid}>
            Sign In
          </LoginButton>
        </form>
        <CreateAccountTypo>
          Not registered?{" "}
          <CreateAccountSpan href={"/register"}>
            Create account
          </CreateAccountSpan>
        </CreateAccountTypo>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "0 20px",
});

const LoginContainer = styled(Box)({
  display: "flex",
  margin: "auto",
  flexDirection: "column",
  gap: 10,
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

const RememberLostBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  alignItems: "center",
});

const LoginButton = styled(Button)({
  fontSize: "16px",
  textTransform: "none",
  border: "1px solid #262b40",
  backgroundColor: "#262b40",
  color: "#fff",
  fontWeight: 600,
  marginTop: "20px",
  width: "100%",
});

const CreateAccountTypo = styled(Typography)({
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

const FiledContainer = styled(Box)({
  marginTop: "20px",
});
