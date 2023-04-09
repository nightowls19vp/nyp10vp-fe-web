import React from "react";
import { Grid, Stack } from "@mui/material";

import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import SideBar from "../component/sidebar/Sidebar.js";
import { useState } from "react";

function Home() {
  const [openSidebar, setOpenSidebar] = useState(null);
  const handleBars = (isOpenBars) => {
    setOpenSidebar(isOpenBars);
  }
  return (
    <Stack>
      <Header handleBars={handleBars} />
      <Grid display={"flex"}>
        <SideBar status={openSidebar} />
      </Grid>
      <Footer />
    </Stack>
  );
}

export default Home;
