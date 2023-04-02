import React from "react";

import Header from "../component/Header.js";
import SiderBar from "../component/Siderbar/SiderBar.js";
import { Grid, Stack } from "@mui/material";

function Home() {
  return (
    <Stack>
      <Header/>
      <Grid display={"flex"}>
        <SiderBar/>
        <div>

        </div>
      </Grid>
    </Stack>
  );
}

export default Home;
