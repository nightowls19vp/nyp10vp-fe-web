import React, { useEffect, useState, useRef } from "react";

import { Avatar, Box, InputBase, Stack, Typography } from "@mui/material";
import { RiSendPlane2Fill } from "react-icons/ri";

import { Colors } from "../../config/Colors.js";
import "../../assets/css/Chat.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

function ContentChat() {
  return (
    <Stack spacing={2} className="content-chat">
      <Box className="avatar-content-chat"  >
        <Avatar />
        <Typography
          variant="subtitle1"
          sx={{ paddingLeft: "10px", fontWeight: 500 }}
        >
          Group 1
        </Typography>
      </Box>
      <Box sx={{ paddingX: '20px'}} >
        <Typography> Nd </Typography>
      </Box>
      <Box className="input-chat" >
        <Box
          sx={{ bgcolor: Colors.search, borderRadius: "15px", width: "90%" }}
        >
          <InputBase
            placeholder="Nhập tin nhắn ... "
            fullWidth
            multiline
            sx={{ padding: "10px" }}
          />
        </Box>
        <Box >
          <RiSendPlane2Fill size={35} color={Colors.textPrimary} />
        </Box>
      </Box>
    </Stack>
  );
}

export default ContentChat;
