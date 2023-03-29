import React, { useState } from "react";

import "../../assets/css/Login.css";
import FormSignUp from "./FormSignUp";
import LogoGG from "../../assets/img/google.png";
import LogoFB from "../../assets/img/facebook.png";
import * as CustomButton from "../../component/custom/CustomButton.js";

import {
  Box,
  Stack,
  TextField,
  Link,
  Divider,
  Typography,
} from "@mui/material";

import api from "../../http/http-common";

function FormSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handleLogin = () => {
    // e.preventDefault();
    var validEmail =
      "^(?=.{8,255}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
    var validPassword =
      "^(?=[.\\S]*[A-Z][.\\S]*)(?=[.\\S]*[0-9][.\\S]*)(?=[.\\S]*[a-z][.\\S]*)[.\\S]{8,255}$";

    if (email === "") {
      setEmailError(true);
      setEmailHelperText("Vui lòng điền email!");
    } else if (!email.match(validEmail)) {
      setEmailError(true);
      setEmailHelperText("Email không hợp lệ!");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordHelperText("Vui lòng điền mật khẩu!");
    } else if (!password.match(validPassword)) {
      setPasswordError(true);
      setPasswordHelperText("Mật khẩu không hợp lệ!");
      setPassword("");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    let formData = {
      username: email,
      password: password,
    };

    submitLogin(formData);

    // if (emailError === false && passwordError === false) {
    //   submitLogin(formData);
    // }
  };

  const submitLogin = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    try {
      window.open(
        `http://localhost:3000/api/auth/google-logins/${"http://localhost:8080".replaceAll(
          "/",
          "@"
        )}`,
        "_self"
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Box
      flex={2}
      sx={{ display: { xs: "flex" } }}
      justifyContent="center"
      alignItems="start"
    >
      <Stack
        spacing={2}
        sx={{ width: { xs: "80%", sm: "70%" } }}
        p={{ xs: 1, sm: 2, md: 4 }}
        m={{ xs: 1, sm: 2, md: 5 }}
        bgcolor="#ffffff"
        justifyContent="center"
        alignItems="center"
        borderRadius={{ xs: 1, sm: 2, md: 5 }}
      >
        <TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          helperText={emailHelperText}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          value={password}
          helperText={passwordHelperText}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <CustomButton.ButtonLogin
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          Đăng nhập
        </CustomButton.ButtonLogin>
        <Link href="#" underline="hover">
          {"Quên mật khẩu?"}
        </Link>
        <Divider flexItem> Hoặc </Divider>
        <CustomButton.ButtonLoginWith
          variant="outlined"
          fullWidth
          onClick={googleLogin}
        >
          <img src={LogoGG} alt="Logo" width={25} />
          <Typography pl={2}> Đăng nhập bằng GG </Typography>
        </CustomButton.ButtonLoginWith>
        <CustomButton.ButtonLoginWith variant="outlined" fullWidth>
          <img src={LogoFB} alt="Logo" width={25} />
          <Typography pl={2}> Đăng nhập bằng FB </Typography>
        </CustomButton.ButtonLoginWith>
        <FormSignUp />
      </Stack>
    </Box>
  );
}

export default FormSignIn;
