import React from "react";
import { Box, Grid, Stack } from "@mui/material";

import HeaderComponent from "../component/header/Header.js";
import FooterComponent from "../component/footer/Footer.js";

function Home() {
  return (
    <Stack>
      <HeaderComponent />
      <Grid display={"flex"}></Grid>
      <Box position={"absolute"} left={0} bottom={0} width={"100%"}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default Home;
