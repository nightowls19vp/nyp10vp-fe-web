import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";

import HeaderComponent from "../component/header/Header.js";
import FooterComponent from "../component/footer/Footer.js";
import SideBarComponent from "../component/sidebar/Sidebar.js";
import dataProfile from "../component/sidebar/data/profile.js"

function Profile() {
  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  };
  return (
    <Stack>
      <HeaderComponent handleBars={handleBars} />
      <Grid display={"flex"}>
        <SideBarComponent status={openSidebar} data={dataProfile} />
      </Grid>
      <FooterComponent />
    </Stack>
  );
}

export default Profile;
