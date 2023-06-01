import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
// import Mapbox from "../component/mapbox/Mapbox.js";
import { getUserCart } from "../redux/packageRequest.js";

import SockectIO from "../http/socket.js";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const socket = SockectIO()

  useEffect(() => {
      // const cartOfUser = async () => {
      //   await getUserCart(user?.data.userInfo._id, user?.accessToken, dispatch, axiosJWT);
      // }
      
      // if (user !== null) {
      //   cartOfUser()
      //   .catch(console.error);
      // }

    // }, [axiosJWT, dispatch, user]);

    // socket.connect();

    // let data = "vy";

    // socket.emit('checkout_callback', user?.data.userInfo._id);

    // socket.on("testZlCallback", (data) => {
    //   console.log("by");
    //   console.log(data);
    // });

    return () => {
      // socket.off('handleDisconnect');
      // socket.disconnect();
    };
  }, [socket, user]);

  return (
    <>
      <DefaultLayout></DefaultLayout>
      {/* <Mapbox /> */}
    </>
  );
}

export default Home;
