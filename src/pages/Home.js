import React from "react";
import { Grid, Stack } from "@mui/material";

import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import SideBar from "../component/sidebar/Sidebar.js";

function Home() {
  return (
    <Stack>
      <Header />
      <Grid display={"flex"}>
        <SideBar />
      </Grid>
      <Footer />
    </Stack>
  );
}

export default Home;
