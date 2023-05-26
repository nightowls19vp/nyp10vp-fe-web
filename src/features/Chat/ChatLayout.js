import React from "react";
import { Box } from "@mui/material";

import "../../assets/css/Chat.scss";
import MenuChat from "./MenuChat";
import ContentChat from "./ContentChat";

function ChatLayout() {
  return (
    <div className="chat-layout">
      <Box flex={1} className="box-menu-chat">
        <MenuChat />
      </Box>
      <Box flex={3} >
        <ContentChat />
      </Box>
    </div>
  );
}

export default ChatLayout;
