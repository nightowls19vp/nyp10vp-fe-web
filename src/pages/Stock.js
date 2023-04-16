import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";

import HeaderComponent from "../component/header/Header.js";
import FooterComponent from "../component/footer/Footer.js";
import SideBarComponent from "../component/sidebar/Sidebar.js";
import "../assets/css/Content.scss";
import dataPackage from "../data/dataPackage.js";

function Stock() {
  const selectedStock = useSelector((state) => state.sidebar?.stockID);
  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  };
  return (
    <Stack>
      <HeaderComponent handleBars={handleBars} />
      <Box className="content">
        <SideBarComponent
          status={openSidebar}
          data={dataPackage}
          title="stock"
          selectedID={selectedStock}
        />
      </Box>
      <FooterComponent />
    </Stack>
  );
}

export default Stock;
