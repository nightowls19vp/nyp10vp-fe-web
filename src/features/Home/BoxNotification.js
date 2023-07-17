import React from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ShortTextIcon from "@mui/icons-material/ShortText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Colors } from "../../config/Colors";

function BoxNotification({ name, date, description }) {
  return (
    <Box className="d-flex home-box-right" sx={{ position: "relative" }}>
      <Box className="box-icon">
        <AttachMoneyIcon sx={{ fontSize: "50px", color: Colors.textPrimary }} />
      </Box>
      <Stack spacing={1} sx={{ width: "70%", position: "relative" }}>
        <Typography sx={{ fontSize: "20px" }}>{name}</Typography>

        <Box className="box-date">
          <QueryBuilderIcon />
          <Typography className="box-datetime">{date}</Typography>
        </Box>

        <Box className="box-date">
          <ShortTextIcon />
          <Typography className="box-datetime">{description}</Typography>
        </Box>
      </Stack>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton>
          <ClearIcon sx={{ color: Colors.error }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default BoxNotification;
