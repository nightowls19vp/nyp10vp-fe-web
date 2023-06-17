import React, { useEffect, useState } from "react";
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

import * as SB from "../../component/Chat/SendBirdGroupChat.js";
import Message from "./Message.js";

function ChatLayout({ item, channelFisrt, messageFirst }) {
  console.log("hsksksk", messageFirst);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const channelID = useSelector((state) => state?.user?.channelID);

  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [channelUser, setChannelUser] = useState();

  const handleChoseChannel = (event, id) => {
    dispatch(updateChannelID(id));
  };

  const handleSendMessage = async () => {
    let list = [];
    await SB.sendMessage(channelUser, message);

    list = await SB.receiveMessage(channelUser);

    console.log(list);

    setListMessage(list);
  };

  const handleSendFile = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    await SB.sendFile(channelUser, fileObj);
  }

  useEffect(() => {
    const connectToSB = async (id) => {
      await SB.connectSendBird(id);
    }

    connectToSB(userInfo?._id).catch(console.error);

    setChannelUser(channelFisrt);
    setListMessage(messageFirst);
  }, [channelFisrt, messageFirst, userInfo]);

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
              <Box key={channel._id} >
                <CustomComponent.GroupChat
                  fullWidth
                  sx={{
                    backgroundColor:
                      channel._id === channelID ? "#ffebcc" : null,
                  }}
                  onClick={(event) => handleChoseChannel(event, channel._id)}
                >
                  <Box
                    className="avatar-menu-chat"
                  >
                    <Avatar src={channel.avatar} />
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
              src={channelUser?.coverUrl}
              sx={{ width: 50, height: 50 }}
            />
            <Typography
              variant="subtitle1"
              sx={{ paddingLeft: "10px", fontWeight: 600, fontSize: 22 }}
            >
              {channelUser?.name}
            </Typography>
          </Box>
          <Box
            sx={{ paddingX: "20px" }}
            id="scrollBar-message"
            className="list-message"
          >
            {listMessage.map((mess) =>
              mess ? (
                <Message mess={mess} key={mess._id} userId={userInfo?._id} />
              ) : null
            )}
            <div id="mess-last"></div>
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
                      <IconButton onClick={handleSendFile}>
                        <AttachFileIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                onChange={(e) => setMessage(e.target.value)}
                sx={{ paddingY: "10px", paddingLeft: "10px" }}
              />
            </Box>
          </div>
        </Stack>
      </Box>

      <Box className="info-group"></Box>
    </Box>
  );
}

export default ChatLayout;
