import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
import Mapbox from "../component/mapbox/Mapbox.js";
import { loginGG } from "../redux/authRequest.js";
import { useNavigate } from "react-router-dom";
import { getUserCart } from "../redux/packageRequest.js";
import { getGroupByUserId } from "../redux/userRequest.js";

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

  const user = useSelector((state) => state.auth.login?.currentUser)
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    getUserCart(user?.data.userInfo?._id, user?.accessToken, dispatch, axiosJWT);
  }, [axiosJWT, dispatch, user]);

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
