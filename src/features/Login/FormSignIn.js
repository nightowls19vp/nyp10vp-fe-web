import React, { useState } from "react";

import "../../assets/css/index.css";
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
  Button,
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
    var checkEmail = false;
    var checkPass = false;

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
      checkEmail = true;
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
      checkPass = true;
      setPasswordHelperText("");
    }

    let formData = {
      username: email,
      password: password,
    };

    if (checkEmail === true && checkPass === true) {
      submitLogin(formData);
    }
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

  return (
    <Box
      flex={2}
      sx={{ display: { xs: "flex" } }}
      justifyContent="center"
      alignItems="center"
      bgcolor="#ffffff"
    >
      <Stack
        id="form-id-signin"
        spacing={2}
        sx={{ width: { xs: "80%", sm: "90%" } }}
        p={{ xs: 1, sm: 2, md: 4 }}
        // m={{ xs: 1, sm: 2, md: 5 }}
        justifyContent="center"
        alignItems="center"
        borderRadius={{ xs: 1, sm: 2, md: 5 }}
        className="form-signin"
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
          required
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
        <CustomButton.Button1
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          Đăng nhập
        </CustomButton.Button1>
        <Link href="#" underline="hover">
          {"Quên mật khẩu?"}
        </Link>
        <Divider flexItem> Hoặc </Divider>
        <Button variant="outlined" fullWidth>
          <img src={LogoGG} alt="Logo" width={25} />
          <Typography pl={2}> Đăng nhập bằng GG </Typography>
        </Button>
        <Button variant="outlined" fullWidth>
          <img src={LogoFB} alt="Logo" width={25} />
          <Typography pl={2}> Đăng nhập bằng FB </Typography>
        </Button>
        <FormSignUp />
      </Stack>
    </Box>
  );
}

export default FormSignIn;
