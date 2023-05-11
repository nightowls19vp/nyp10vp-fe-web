import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SettingsPhoneOutlinedIcon from "@mui/icons-material/SettingsPhoneOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors.js";
import ButtonSetting from "../../component/noti/ButtonSetting";
import * as Custom from "../../component/custom/CustomComponents.js";
import { getSettingUser, updateSettingUser } from "../../redux/userRequest";

function Setting() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [stockNoti, setStockNoti] = useState(
    user?.data.userInfo.setting.stockNoti
  );
  const [newsNoti, setNewsNoti] = useState(
    user?.data.userInfo.setting.newsNoti
  );
  const [callNoti, setCallNoti] = useState(user?.data.userInfo.setting.msgNoti);
  const [chatNoti, setChatNoti] = useState(
    user?.data.userInfo.setting.stockNoti
  );

  const getSetting = async(userID) => {
    const res = await getSettingUser(userID);
    console.log(res);
  };

  const updateSetting = async() => {
    let formData = {
      stockNoti: stockNoti,
      newsNoti: newsNoti,
      callNoti: callNoti,
      msgNoti: chatNoti
    }
    console.log(formData);
    await updateSettingUser(user?.data.userInfo._id, formData);
    // getSetting(user?.data.userInfo._id)
  }

  const handlButtonStock = () => {
    setStockNoti(() => !stockNoti);
    updateSetting();
  };

  const handlButtonNews = () => {
    setNewsNoti(() => !newsNoti);
    updateSetting();
  };

  const handlButtonCall = () => {
    setCallNoti(() => !callNoti);
    updateSetting();
  };

  const handlButtonChat = () => {
    setChatNoti(() => !chatNoti);
    updateSetting();
  };

  // useEffect(() => {
  //   let formData = {
  //     stockNoti: stockNoti,
  //     newsNoti: newsNoti,
  //     callNoti: callNoti,
  //     msgNoti: chatNoti
  //   }
  //   updateSettingUser(user?.data.userInfo._id, formData);
  //   getSetting(user?.data.userInfo._id)

  // }, [stockNoti, newsNoti, callNoti, chatNoti, user])


  return (
    <Box>
      <Typography
        variant="button"
        fontSize={"18px"}
        color={Colors.textPrimary}
        display="block"
        gutterBottom
      >
        Cài đặt thông báo
      </Typography>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setStockNoti(!stockNoti)}
        onClick={handlButtonStock}
      >
        <ButtonSetting
          title="Kho hàng"
          describe="Nhận thông báo khi ..."
          isChecked={stockNoti}
        >
          <Inventory2OutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onClick={() => setNewsNoti(!newsNoti)}
        // onClick={handlButtonNews}
      >
        <ButtonSetting
          title="Quảng cáo"
          describe="Nhận thông báo khi ..."
          isChecked={newsNoti}
        >
          <NewspaperOutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setCallNoti(!callNoti)}
        onClick={handlButtonCall}
      >
        <ButtonSetting
          title="Gọi điện"
          describe="Nhận thông báo khi ..."
          isChecked={callNoti}
        >
          <SettingsPhoneOutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setChatNoti(!chatNoti)}
        onClick={handlButtonChat}
      >
        <ButtonSetting
          title="Tin nhắn"
          describe="Nhận thông báo khi ..."
          isChecked={chatNoti}
        >
          <ForumOutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
    </Box>
  );
}

export default Setting;
