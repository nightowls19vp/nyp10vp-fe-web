import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import "../../assets/css/Chat.scss";
import { Colors } from "../../config/Colors";

function Message({ mess, userId }) {
  return (
    <Box
      sx={{
        width: "100%",
        marginY: "2px",
        display: "flex",
        justifyContent: userId === mess.user._id ? "flex-end" : "flex-start",
        alignItems: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: userId === mess.user._id ? "flex-end" : "flex-start",
          alignItems: "flex-end",
        }}
      >
        {userId !== mess.user._id ? (
          <Avatar src={mess.user.avatar} sx={{ width: 24, height: 24 }} />
        ) : null}
        <Box
          className="message"
          sx={{
            backgroundColor:
              userId !== mess.user._id ? Colors.gray : Colors.chat,
          }}
        >
          <Typography> {mess.text} </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Message;
