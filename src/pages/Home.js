import React from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";

function Home() {
  const dispatch = useDispatch();

  const urlParams = new URL(window.location.href).searchParams;

  if (urlParams.get("accessToken") != null) {
    const token = {
      accessToken:  urlParams.get("accessToken"),
    }
    dispatch(loginSuccess(token));
  }
 
  return (
    <DefaultLayout >
      <></>
    </DefaultLayout>
  );
}

export default Home;
