import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  Link,
  Divider,
  Typography,
  Button,
} from "@mui/material";

import "../../assets/css/FormSignIn.scss";
import FormSignUp from "./FormSignUp";
import LogoGG from "../../assets/img/google.png";
import LogoFB from "../../assets/img/facebook.png";
import * as CustomButton from "../../component/custom/CustomComponents.js";

import api from "../../http/http-common";

function FormSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // e.preventDefault();
    var checkEmail = false;
    var checkPass = false;

    if (email === "") {
      setEmailError(true);
      setEmailHelperText("Vui lòng điền email!");
    } else {
      setEmailError(false);
      checkEmail = true;
      setEmailHelperText("");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordHelperText("Vui lòng điền mật khẩu!");
    } else {
      setPasswordError(false);
      checkPass = true;
      setPasswordHelperText("");
      setPassword("");
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
      if (response.data.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      setEmailError(true);
      setPasswordError(true);
      setPasswordHelperText("username hoặc mật khẩu không đúng!");
    }
  };

  return (
    <Box
      flex={2}
      sx={{ display: { xs: "flex" }, flexDirection: "column" }}
      justifyContent="center"
      alignItems="center"
      bgcolor="#ffffff"
    >
      <Stack
        id="form-id-signin"
        spacing={2}
        sx={{ width: { xs: "80%", sm: "90%" } }}
        p={2}
        mt={2}
        mb={2}
        alignItems="center"
        className="form-class-signin"
      >
        <TextField
          required
          id="outlined-required-username"
          label="Username"
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
