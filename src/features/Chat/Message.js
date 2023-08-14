import React from "react";
import { Avatar, Box, Link, Typography } from "@mui/material";

import "../../assets/css/Chat.scss";
import { Colors } from "../../config/Colors";

function Message({ listMessage, userId }) {
  return (
    <>
      {listMessage.map((mess, idx) =>
        mess ? (
          <Box
            sx={{
              width: "100%",
              marginY: "2px",
              display: "flex",
              justifyContent:
                userId === mess.user._id ? "flex-end" : "flex-start",
              alignItems: "flex-end",
            }}
            key={idx}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent:
                  userId === mess.user._id ? "flex-end" : "flex-start",
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
                {mess.type === "file" ? (
                  mess.fileType === "image/jpeg" ? (
                    <image src={mess.url} alt="image" className="imgMess" />
                  ) : (
                    <Link
                      href={mess.url}
                      color="inherit"
                      download={mess.name}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {mess.name}
                    </Link>
                  )
                ) : (
                  <Typography> {mess.text} </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ) : null
      )}
    </>
  );
}

export default Message;
