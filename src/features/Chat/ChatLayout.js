import React from "react";
import { Box } from "@mui/material";

import "../../assets/css/Chat.scss";
import MenuChat from "./MenuChat";
import ContentChat from "./ContentChat";

function ChatLayout() {
  return (
    <Box className="chat-layout">
      <Box className="box-menu-chat">
        <MenuChat />
      </Box>
      <Box className="box-content-chat">
        <ContentChat />
      </Box>
    </Box>
  );
}

export default ChatLayout;
