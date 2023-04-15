import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";

import HeaderComponent from "../component/header/Header.js";
import FooterComponent from "../component/footer/Footer.js";
import SideBarComponent from "../component/sidebar/Sidebar.js";
import dataPackage from "../component/sidebar/data/dataPackage.js";
import { useSelector } from "react-redux";

function Stock() {
  const selectedStock = useSelector((state) => state.sidebar?.stockID);
  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  };
  return (
    <Stack>
      <HeaderComponent handleBars={handleBars} />
      <Grid display={"flex"}>
        <SideBarComponent
          status={openSidebar}
          data={dataPackage}
          title="stock"
          selectedID={selectedStock}
        />
      </Grid>
      <FooterComponent />
    </Stack>
  );
}

export default Stock;
