import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
// import Mapbox from "../component/mapbox/Mapbox.js";
import { getValidateGG } from "../redux/authRequest.js";
import { useNavigate } from "react-router-dom";
import { getUserCart } from "../redux/packageRequest.js";

function Home() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const urlQuery = new URL(window.location.href).searchParams;

  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // useEffect(() => {
  //   let token = "";
  //   const inforOfUser = async (token) => {
  //     await getValidateGG(token?.accessToken, dispatch, axiosJWT);
  //   };

  //   if (urlQuery.get("accessToken") != null) {
  //     let query = urlQuery.get("accessToken").slice(0, urlQuery.get("accessToken").indexOf('?'));
  //     token = {
  //       accessToken: query,
  //     };

  //     console.log(token?.accessToken);

  //     inforOfUser(token).catch(console.error);
  //   }
  // }, [axiosJWT, dispatch, urlQuery, user]);

  useEffect(() => {
    const cartOfUser = async () => {
      await getUserCart(user?.data.userInfo._id, user?.accessToken, dispatch, axiosJWT);
    }

    cartOfUser()
    .catch(console.error);

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
