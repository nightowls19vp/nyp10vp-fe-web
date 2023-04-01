import React, { Component } from "react";

import "../assets/css/index.css";

import { Stack } from "@mui/material";
import Welcome from "../features/Login/Welcome";
import FormSignIn from "../features/Login/FormSignIn";

class Login extends Component {
  render() {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        bgcolor={"#ffeacc"}
        className="page"
      >
        <Stack
          direction="row"
          className="login-page"
          sx={{ height: "calc(100vh - 25%)", width: { xs: "80%", sm: "60%" } }}
        >
          <Welcome />
          <FormSignIn />
        </Stack>
      </Stack>
    );
  }
}

export default Login;
