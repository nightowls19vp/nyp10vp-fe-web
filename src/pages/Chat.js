import React, { useEffect, useRef, useState } from "react";
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

import "../assets/css/Chat.scss";
import { Colors } from "../config/Colors";
import * as CustomComponent from "../component/custom/CustomComponents.js";
import { RiSendPlane2Fill } from "react-icons/ri";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import DefaultLayout from "../layout/DefaultLayout.js";
import ChatLayout from "../features/Chat/ChatLayout.js";

import { useDispatch, useSelector } from "react-redux";

import * as SB from "../component/Chat/SendBirdGroupChat.js";
import { updateChannelID } from "../redux/userSlice";

function Chat() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const groups = useSelector((state) => state?.user?.groupAll);
  const channels = useSelector((state) => state?.user?.channel);

  const [listChannel, setListChannel] = useState([]);
  const [channelFisrt, setChannelFirst] = useState();
  const [messageFirst, setMessageFirst] = useState([]);

  useEffect(() => {
    const getChannels = async () => {
      await SB.connectSendBird(userInfo?._id);

      let newChannel = [];

      for (let channel of channels) {
        let item = await SB.getUserChannel(channel);
        let fromData = {
          _id: item.url,
          name: item.name,
          avatar: item.coverUrl,
        };
        newChannel.push(fromData);
      }
      setListChannel(newChannel);
      dispatch(updateChannelID(newChannel[0]._id));

      let c = await SB.getUserChannel(channels[0]);
      setChannelFirst(c);

      let m = await SB.receiveMessage(c);
      setMessageFirst(m);
    };

    getChannels().catch(console.error);
  }, [channels, dispatch, groups, userInfo]);

  return (
    <DefaultLayout>
      <ChatLayout
        item={listChannel}
        channelFisrt={channelFisrt}
        messageFirst={messageFirst}
      />
    </DefaultLayout>
  );
}

export default Chat;
