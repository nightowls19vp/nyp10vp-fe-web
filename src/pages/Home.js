import React, { useEffect} from "react";
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
  const urlParams = new URL(window.location.href).searchParams;

  const user = useSelector((state) => state.auth.login?.currentUser)
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // useEffect(() => {
  //   let token = "";
  //   if (urlParams.get("accessToken") != null) {
  //     token = {
  //       accessToken: urlParams.get("accessToken"),
  //     };
  //     // dispatch(loginSuccess(token));
  //   }

  //   console.log(token);

  //   const inforOfUser = async () => {
  //     await getValidateGG(token?.accessToken, dispatch, axiosJWT);
  //   }

  //   inforOfUser()
  //   .catch(console.error);

  // }, [axiosJWT, dispatch, urlParams, user])

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
