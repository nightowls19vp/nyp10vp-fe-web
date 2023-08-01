import React from "react";

import { Box } from "@mui/material";

import HomeImg from "../../assets/img/Home.png";
function HomeLayoutNoGroup() {
  return (
    <Box sx={{ width: "100%"}}>
        <img src={HomeImg} alt="Logo" width={"100%"} />
    </Box>

  );
}

export default HomeLayoutNoGroup;
