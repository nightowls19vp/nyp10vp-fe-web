import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";

import HeaderComponent from "../component/header/Header.js";
import FooterComponent from "../component/footer/Footer.js";
import SideBarComponent from "../component/sidebar/Sidebar.js";
import dataPackage from "../component/sidebar/data/dataPackage.js";

function Home() {
  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  };
  return (
    <Stack>
      <HeaderComponent handleBars={handleBars} />
      <Grid display={"flex"}>
        <SideBarComponent status={openSidebar} data={dataPackage} />
      </Grid>
      <FooterComponent />
    </Stack>
  );
}

export default Home;
