import React, { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Colors } from "../../../config/Colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarComponent from "../../../component/calendar/Calendar";

function GroupTasks() {

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Box className="flex-group">
        <Box className="title-group-spending">
          <CalendarMonthIcon
            sx={{
              paddingRight: "10px",
              color: Colors.textPrimary,
              fontSize: "50px",
            }}
          />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Sự kiện trong nhóm
          </Typography>
        </Box>
      </Box>
      <CalendarComponent />
    </Stack>
  );
}

export default GroupTasks;
