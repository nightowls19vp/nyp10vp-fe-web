import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
// import Mapbox from "../component/mapbox/Mapbox.js";
import { getUserCart } from "../redux/packageRequest.js";
import GroupSpending from "../features/Group/GroupSpending.js";

// import SockectIO from "../http/socket.js";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // const socket = SockectIO()

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

    // socket.emit('checkout_callback', user?.data.userInfo._id);

    // socket.on("testZlCallback", (data) => {
    //   console.log("by");
    //   console.log(data);
    // });

    // return () => {
    //   // socket.off('handleDisconnect');
    //   // socket.disconnect();
    // };
  // }, [socket, user]);

  let listMember = [];

  let formData = {
    _id: "648406c2549163797aa489ww",
    name: "user1",
  };
  listMember.push(formData);

  formData = {
    _id: "648406c2549163797aa486ww",
    name: "user2",
  };
  listMember.push(formData);
  formData = {
    _id: "648406c2549163797aa486wu",
    name: "user3",
  };
  listMember.push(formData);

  return (
    <>
      <DefaultLayout>
      </DefaultLayout>
      {/* <Mapbox /> */}
    </>
  );
}

export default Home;
