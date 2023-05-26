import React, { useEffect, useState, useRef } from "react";

import { Avatar, Box, InputBase, Stack, Typography } from "@mui/material";

import { Colors } from "../../config/Colors.js";
import "../../assets/css/Chat.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { calculateNewValue } from "@testing-library/user-event/dist/utils/index.js";

function ContentChat() {
  return (
    <Stack spacing={2} >
      <Box className="avatar-content-chat">
        <Avatar />
        <Typography
          variant="subtitle1"
          sx={{ paddingLeft: "10px", fontWeight: 500 }}
        >
          Group 1
        </Typography>
      </Box>
      <Box >
        <Typography> Nd </Typography>
      </Box>
      <Box sx={{ bgcolor: Colors.search, borderRadius: "15px" }}>
        <InputBase
          placeholder="Nhập tin nhắn ... "
          fullWidth
          multiline
          sx={{ padding: "10px" }}
        />
      </Box>
    </Stack>
  );
}

export default ContentChat;
