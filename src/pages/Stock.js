import React from "react";

import HeaderComponent from '../component/header/Header.js';
import FooterComponent from '../component/footer/Footer.js';
import { Grid, Stack } from "@mui/material";

function Stock() {
  return (
    <Stack>
      <HeaderComponent/>
      <Grid display={"flex"}>
        <div></div>
      </Grid>
      <FooterComponent />
    </Stack>
  );
}

export default Stock;
