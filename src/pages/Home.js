import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
// import Mapbox from "../component/mapbox/Mapbox.js";
import { getUserCart } from "../redux/packageRequest.js";
import { getGroupChannel } from "../redux/userRequest.js";
import HomeLayout from "../features/Home/HomeLayout.js";
import { getChatsUser, getGroupsUser, getTodosUser } from "../redux/authRequest.js";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    // const getCartAndChannel = async () => {
    //   await getUserCart(
    //     user?.data.userInfo._id,
    //     user?.accessToken,
    //     dispatch,
    //     axiosJWT
    //   );

    //   await getGroupChannel(user?.accessToken, dispatch, axiosJWT);
    // };

    const getHomeGroupsUser = async () => {
      await getGroupsUser(user?.accessToken, dispatch, axiosJWT);

      await getChatsUser(user?.accessToken, dispatch, axiosJWT);

      await getTodosUser(user?.accessToken, dispatch, axiosJWT);
    };

    if (user !== null) {
      //getCartAndChannel().catch(console.error);
      getHomeGroupsUser().catch(console.error);
    }

    return () => {
      //getCartAndChannel();
      getHomeGroupsUser();
    };
  }, [axiosJWT, dispatch, user]);

  return (
    <>
      <DefaultLayout>
        <HomeLayout />
      </DefaultLayout>
      {/* <Mapbox /> */}
    </>
  );
}

export default Home;
