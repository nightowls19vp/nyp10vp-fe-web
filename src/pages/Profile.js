import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Box } from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";

import HeaderComponent from "../component/header/Header.js";
import FooterComponent from "../component/footer/Footer.js";
import SideBarComponent from "../component/sidebar/Sidebar.js";
import PersonalInformation from "../features/Profile/PersonalInformation.js";
import "../assets/css/Content.scss";
import dataProfile from "../component/sidebar/data/profile.js";

function Profile() {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const decodedToken = jwtDecode(user?.accessToken);
  // console.log(decodedToken?.user.username);
  let formData = {
    username: decodedToken?.user.username,
  };
  
  // const dispatch = useDispatch();
  // let axiosJWT = axios.create();

  // const refeshToken = async () => {
  //   try {
  //     const res = await axios.post("", {
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // axiosJWT.interceptors.request.use(
  //   async(config) => {
  //     let day = new Date();
  //     const decodedToken = jwtDecode(user?.accessToken);
  //     if (decodedToken.exp < day.setTime()/1000) {
  //       const data = await refeshToken();
  //       const refeshUser = {
  //         accessToken: data.accessToken,
  //       };
  //       dispatch(loginSuccess(refeshUser));
  //       config.headers["token"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // )

  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  };
  return (
    <Stack>
      <HeaderComponent handleBars={handleBars} />
      <Box className="content" >
        <SideBarComponent status={openSidebar} data={dataProfile} />
        <PersonalInformation info={formData} />
      </Box>
      <FooterComponent />
    </Stack>
  );
}

export default Profile;
