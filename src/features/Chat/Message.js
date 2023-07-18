import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import "../../assets/css/Chat.scss";
import { Colors } from "../../config/Colors";

function Message({ mess, userId }) {
  console.log("mess", mess);
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
      {userId !== mess.user._id ? (
        <Avatar src={mess.user.avatar} sx={{ width: 24, height: 24 }} />
      ) : null}
      {/* {mess.type === "file" ? (
        <img src={mess.url} alt="Logo" width={25} />
      ) : (
        <Box className="message">
          <Typography> {mess.text} </Typography>
        </Box>
      )} */}
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
  );
}

export default Message;
