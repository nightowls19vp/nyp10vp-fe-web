import React from "react";

import "../assets/css/Chat.scss";

import DefaultLayout from "../layout/DefaultLayout.js";
import ChatLayout from "../features/Chat/ChatLayout.js";

function Chat() {
  return (
    <DefaultLayout >
        <ChatLayout />
    </DefaultLayout>
  );
}

export default Chat;
