import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import "../../assets/css/Chat.scss";

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
      {/* {userId !== mess.user._id ? (
        <Avatar sx={{ width: 24, height: 24 }} />
      ) : null}
      {mess.type === "file" ? (
        <img src={mess.url} alt="Logo" width={25} />
      ) : (
        <Box className="message">
          <Typography> {mess.text} </Typography>
        </Box>
      )} */}
      <Box className="message">
        <Typography> {mess.text} </Typography>
      </Box>
    </Box>
  );
}

export default Message;
