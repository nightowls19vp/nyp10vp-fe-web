import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
// import Mapbox from "../component/mapbox/Mapbox.js";
import { getUserCart } from "../redux/packageRequest.js";

import socket from "../http/socket.js";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
      const cartOfUser = async () => {
        await getUserCart(user?.data.userInfo._id, user?.accessToken, dispatch, axiosJWT);
      }
      
      if (user !== null) {
        cartOfUser()
        .catch(console.error);
      }

    }, [axiosJWT, dispatch, user]);

    // socket.connect();

    // let data = "vy";

    // socket.emit('checkout_callback', data);

    // socket.on('send-callback', data => {
    //   console.log(data);
    // })

    // socket.on('handleDisconnect');

    // return () => {
    //   socket.off('checkout_callback');
    //   // socket.off('handleDisconnect');
    //   socket.disconnect();
    // };
  // }, []);

  return (
    <>
      <DefaultLayout></DefaultLayout>
      {/* <Mapbox /> */}
    </>
  );
}

export default Home;
