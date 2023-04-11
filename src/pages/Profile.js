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
  // const user = useSelector((state) => state.auth.login?.currentUser);
  // const decodedToken = jwtDecode(user?.accessToken);
  // let formData = {
  //   username: decodedToken?.user.username,
  // };

  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  };
  return (
    <Stack>
      <HeaderComponent handleBars={handleBars} />
      <Box className="content">
        <SideBarComponent status={openSidebar} data={dataProfile} />
        <PersonalInformation status={openSidebar} />
      </Box>
      <FooterComponent />
    </Stack>
  );
}

export default Profile;
