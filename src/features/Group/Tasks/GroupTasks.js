import React, { useState } from "react";

import { Box, Stack, Typography, IconButton } from "@mui/material";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

import { Colors } from "../../../config/Colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function GroupTasks() {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });
    
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
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
            Các việc cần làm trong nhóm
          </Typography>
        </Box>
        {/* <IconButton >
          <AddTaskIcon sx={{ color: Colors.textPrimary, fontSize: "32px" }} />
        </IconButton> */}
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
        <DemoItem label="Controlled calendar">
          <DateRangeCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    </Stack>
  );
}

export default GroupTasks;
