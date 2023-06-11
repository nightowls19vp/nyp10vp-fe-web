import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";

import { Colors } from "../../config/Colors.js";
import "../../assets/css/Chat.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { RiSendPlane2Fill } from "react-icons/ri";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import { updateChannelID } from "../../redux/userSlice.js";

function ChatLayout({ item }) {
  const dispatch = useDispatch();

  const channelID = useSelector((state) => state?.user?.channelID);

  const [message, setMessage] = useState("");

  const handleChoseChannel = (event, id) => {
    dispatch(updateChannelID(id));
  };

  const handleSendMessage = async () => {
    const userMessageParams = {};
    userMessageParams.message = message;
    item[channelID]
      .sendUserMessage(userMessageParams)
      .onSucceeded((message) => {
        console.log(message);
      })
      .onFailed((error) => {
        console.log(error);
        console.log("failed");
      });

      console.log(item[channelID]);
  };

  return (
    <Box className="chat-layout">
      <Box className="box-menu-chat">
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Chat
          </Typography>
          <Box sx={{ bgcolor: Colors.search, borderRadius: "20px" }}>
            <InputBase
              placeholder="Tìm kiếm "
              fullWidth
              sx={{ paddingLeft: "10px", height: "40px" }}
            />
          </Box>

          {item.map((channel, idx) =>
            channel ? (
              <Box key={idx}>
                <CustomComponent.GroupChat
                  fullWidth
                  onClick={(event) => handleChoseChannel(event, idx)}
                >
                  <Box className="avatar-menu-chat">
                    <Avatar src={channel.coverUrl} />
                    <Typography
                      variant="body1"
                      sx={{ paddingLeft: "5px", color: Colors.text }}
                    >
                      {channel.name}
                    </Typography>
                  </Box>
                </CustomComponent.GroupChat>
              </Box>
            ) : null
          )}
        </Stack>
      </Box>

      <Box className="box-content-chat">
        <Stack spacing={2} className="content-chat">
          <Box className="avatar-content-chat">
            <Avatar
              src={item[channelID].coverUrl}
              sx={{ width: 50, height: 50 }}
            />
            <Typography
              variant="subtitle1"
              sx={{ paddingLeft: "10px", fontWeight: 600, fontSize: 22 }}
            >
              {item[channelID].name}
            </Typography>
          </Box>
          <Box sx={{ paddingX: "20px" }}>
            <Typography> Nd </Typography>
          </Box>
          <div className="input-chat">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                bgcolor: Colors.search,
                borderRadius: "30px",
              }}
            >
              <InputBase
                placeholder="Nhập tin nhắn ... "
                fullWidth
                multiline
                value={message}
                endAdornment={
                  <InputAdornment position="end">
                    {message ? (
                      <IconButton onClick={handleSendMessage}>
                        <RiSendPlane2Fill />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <AttachFileIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                onChange={(e) => setMessage(e.target.value)}
                sx={{ paddingY: "10px", paddingLeft: "10px" }}
              />
              {/* {message ? (
                <RiSendPlane2Fill onClick={handleSendMessage} />
              ) : (
                <AttachFileIcon />
              )} */}
            </Box>
          </div>
        </Stack>
      </Box>

      <Box className="info-group"></Box>
    </Box>
  );
}

export default ChatLayout;
