import React from "react";

import { Stack, Typography, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

import * as CustomComponent from "../../component/custom/CustomComponents";
import { useSelector } from "react-redux";

function BoxChat() {
  const homeChat = useSelector((state) => state?.home.homeChat);
  return (
    <>
      {homeChat.length > 0 ? (
        <Stack spacing={2}>
          <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
            Nhóm chat của tôi
          </Typography>
          {homeChat.map((chat, idx) =>
            chat ? (
              <Box className="d-flex" key={idx}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <GroupIcon />
                  <Typography sx={{ paddingX: "10px", fontSize: "18px" }}>
                    {chat?.name}
                  </Typography>
                </Box>
                <CustomComponent.Button1>Chat</CustomComponent.Button1>
              </Box>
            ) : null
          )}
        </Stack>
      ) : null}
    </>
  );
}

export default BoxChat;
