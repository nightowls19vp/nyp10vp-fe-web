import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import "../../assets/css/Chat.scss";

function Message({ mess, userId }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: userId === mess.user._id ? "flex-end" : "flex-start",
        alignItems: "flex-end"
      }}
    >
      <Box className="message">
        <Typography> {mess.text} </Typography>
      </Box>
      <Avatar sx={{ width: 24, height: 24 }} />
    </Box>
  );
}

export default Message;
