import React from "react";

import { Box, Typography } from "@mui/material";

import "../assets/css/Chat.scss";

import DefaultLayout from "../layout/DefaultLayout.js";
import ChatLayout from "../features/Chat/ChatLayout.js";
import { Colors } from "../config/Colors";

function Chat() {
  return (
    <DefaultLayout>
      <ChatLayout />
    </DefaultLayout>
  );
}

export default Chat;
