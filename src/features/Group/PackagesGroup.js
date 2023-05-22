import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import PackageGroup from "./PackageGroup";

function PackagesGroup({ data }) {
  return (
    <Stack spacing={2}>
      {data.packages.map((route, index) => route ? <PackageGroup item={route} key={index} /> : null)}
      <Stack
        spacing={2}
        sx={{
          width: "70%",
          bgcolor: Colors.box,
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <PersonOutlinedIcon />
          <Typography > {data.members[0].user} </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default PackagesGroup;
