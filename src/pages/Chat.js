import React, { useEffect, useRef, useState } from "react";

import "../assets/css/Chat.scss";

import DefaultLayout from "../layout/DefaultLayout.js";
import ChatLayout from "../features/Chat/ChatLayout.js";

import { useSelector } from "react-redux";

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

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const groups = useSelector((state) => state?.user?.groupAll);
  const channels = useSelector((state) => state?.user?.channel);

  const [listChannel, setListChannel] = useState([]);

  // const onError = (error) => {
  //   console.log(error);
  // };

  useEffect(() => {
    const setupUser = async () => {
      const sendbirdChat = await SendbirdChat.init({
        appId: SENDBIRD_INFO.appId,
        localCacheEnabled: true,
        modules: [new GroupChannelModule()],
      });

      await sendbirdChat.connect(userInfo?._id);
      await sendbirdChat.setChannelInvitationPreference(true);

      sb = sendbirdChat;

      // const channel = await sb.groupChannel.getChannel(groups[0].child[0].channel);

      let newChannel = [];

      for (let channel of channels) {
        let item = await sb.groupChannel.getChannel(channel);
        newChannel.push(item);
      }

      // console.log(channel);

      // const [channels, error] = await loadChannels(channelHandlers);

      setListChannel(newChannel);

      // if (error) {
      //   return onError(error);
      // }
    };

    setupUser().catch(console.error);
  }, [channels, groups, userInfo]);

  console.log(listChannel);

  return (
    <DefaultLayout>
      {listChannel.length !== 0 ? <ChatLayout item={listChannel} /> : null}
    </DefaultLayout>
  );
}

export default Chat;
