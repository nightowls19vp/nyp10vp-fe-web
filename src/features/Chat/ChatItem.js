import React, { useEffect, useState } from "react";
import ChatLayout from "./ChatLayout";

import { useDispatch, useSelector } from "react-redux";

import * as SB from "../../component/Chat/SendBirdGroupChat.js";
import { updateChannelID } from "../../redux/userSlice";

function ChatItem() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const channels = useSelector((state) => state?.user?.channel);

  const [listChannel, setListChannel] = useState([]);
  const [channelFisrt, setChannelFirst] = useState();
  const [messageFirst, setMessageFirst] = useState([]);

  useEffect(() => {
    const getChannels = async () => {
      let newChannel = [];

      await SB.connectSendBird(userInfo?._id);
      let arr = [
        "sendbird_group_channel_400431429_7a67d5a7ebe3030fd7c2dce3aaf90f06d40b9608",
        "sendbird_group_channel_400431429_e7a01439a896b4d3bd7606528a8fb4a63bf6407f",
        "sendbird_group_channel_400430300_479cf91bc8150e9a9eaede7568e6a2e7ff8ec075"
      ];
      // for (let channel of arr) {
      //   let item = await SB.getUserChannel(channel);
      //   if (item) {
      //     let fromData = {
      //       _id: item.url,
      //       name: item.name,
      //       avatar: item.coverUrl,
      //       lastMess: item.lastMessage != null ? item.lastMessage.message : "",
      //     };
      //     newChannel.push(fromData);
      //   }
      // }
      for (let channel of channels) {
        let item = await SB.getUserChannel(channel.channel);
        if (item) {
          let fromData = {
            _id: item.url,
            name: item.name,
            avatar: item.coverUrl,
            lastMess: item.lastMessage != null ? item.lastMessage.message : "",
          };
          newChannel.push(fromData);
        }
      }
      setListChannel(newChannel);
      dispatch(updateChannelID(newChannel[0]._id));
      let c = await SB.getUserChannel(channels[0].channel);
      setChannelFirst(c);

      let m = await SB.receiveMessage(c);
      setMessageFirst(m.reverse());
    };

    if (channels.length > 0) {
      getChannels().catch(console.error);
    }
  }, [channels, dispatch, userInfo?._id]);

  return (
    <>
      {listChannel.length > 0 ? (
        <ChatLayout
          item={listChannel}
          channelFisrt={channelFisrt}
          messageFirst={messageFirst}
        />
      ) : null}
    </>
  );
}

export default ChatItem;
