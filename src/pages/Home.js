import React from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import Mapbox from "../component/mapbox/Mapbox.js";
import { loginGG } from "../redux/authRequest.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = new URL(window.location.href).searchParams;

  if (urlParams.get("accessToken") != null) {
    const token = {
      accessToken: urlParams.get("accessToken"),
    };
    dispatch(loginSuccess(token));
  }

  return (
    <>
      <DefaultLayout>
        <></>
      </DefaultLayout>
      {/* <Mapbox /> */}
    </>
  );
}

export default Home;
