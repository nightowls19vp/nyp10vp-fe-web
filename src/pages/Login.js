import React, { Component } from "react";
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
        sx={{ height: "100vh", width: "100%" }}
      >
        <Stack
          direction="row"
          className="login-page"
          sx={{ width: { xs: "80%", sm: "60%" } }}
        >
          <Welcome />
          <FormSignIn />
        </Stack>
      </Stack>
    );
  }
}

export default Login;
