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

import SendbirdChat from "@sendbird/chat";
import {
  GroupChannelModule,
  GroupChannelFilter,
  GroupChannelListOrder,
  MessageFilter,
  MessageCollectionInitPolicy,
} from "@sendbird/chat/groupChannel";
import { SENDBIRD_INFO } from "../features/constants/constants";
let sb;

function Chat() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const groups = useSelector((state) => state?.user?.groupAll);
  const channels = useSelector((state) => state?.user?.channel);

  const [listChannel, setListChannel] = useState([]);

  // const channelID = useSelector((state) => state?.user?.channelID);

  // const [message, setMessage] = useState("");

  // const handleChoseChannel = (event, id) => {
  //   //
  // };

  // const handleSendMessage = async () => {
  //   //
  // };

  useEffect(() => {
    console.log("vyyyyy");
    const getChannels = async () => {
      const sendbirdChat = await SendbirdChat.init({
        appId: SENDBIRD_INFO.appId,
        localCacheEnabled: true,
        modules: [new GroupChannelModule()],
      });

      await sendbirdChat.connect(userInfo?._id);
      await sendbirdChat.setChannelInvitationPreference(true);

      sb = sendbirdChat;

      let newChannel = [];

      for (let channel of channels) {
        let item = await sb.groupChannel.getChannel(channel);
        newChannel.push(item);
      }
      setListChannel(newChannel);

    };

    getChannels().catch(console.error);
  }, [channels, groups, userInfo]);

  console.log(listChannel);

  return (
    <DefaultLayout>
      {/* {listChannel.length !== 0 ? <ChatLayout item={listChannel} /> : null} */}
      
    </DefaultLayout>
  );
}

export default Chat;
