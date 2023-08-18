import React from "react";

import { Box  } from "@mui/material";

import * as CustomComponent from "../../component/custom/CustomComponents";
import "../../assets/css/Home.scss";
function HomeLayoutNoGroup() {
  return (
    <Box className="home-image">
        <Box>
          <CustomComponent.Button1>Package</CustomComponent.Button1>
        </Box>
    </Box>

  );
}

export default HomeLayoutNoGroup;
