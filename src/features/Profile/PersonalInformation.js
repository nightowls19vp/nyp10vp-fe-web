import React, { useRef, useState, useEffect } from "react";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  CircularProgress,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import { AiFillCamera } from "react-icons/ai";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import { useDispatch, useSelector } from "react-redux";

import {
  updateInformationUser,
  updateAvatarUser,
  uploadFile,
} from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice.js";

import LogoGG from "../../assets/img/google.png";
import ImgAvatar from "../../assets/img/user.png";
import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";

function PersonalInformation() {
  const inputRef = useRef();
  const dateRef = useRef();
  const avatarRef = useRef();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);

  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [image, setImage] = useState(userInfo.avatar ?? ImgAvatar);
  const email = userInfo.email;
  const [name, setName] = useState(userInfo.name);
  const [phone, setPhone] = useState(userInfo.phone ?? "");
  const [dob, setDob] = useState(userInfo.dob ?? null);
  // const [socialAcc, setSocialAcc] = useState(
  //   userInfo.socialAccounts !== undefined ? true : false
  // );
  const socialAcc = userInfo.socialAccounts !== undefined ? true : false;
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setStatus(true);
    const form = new FormData();
    form.append("file", fileObj);
    const res = await uploadFile(
      user?.data.userInfo._id,
      user?.accessToken,
      form
    );
    const formAvatar = new FormData();
    formAvatar.append("avatar", res.data);
    const resImg = await updateAvatarUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formAvatar,
      dispatch,
      axiosJWT
    );

    if (resImg != null) {
      setStatus(false);
    }

    // if (resImg.statusCode === 200) {
    //   setImage(res.data);
    //   setStatus(1);
    //   setMsg("Cập nhật thông tin thành công");
    // } else {
    //   setStatus(2);
    //   setMsg("Cập nhật thông tin thất bại!");
    // }

    // setTimeout(() => {
    //   setStatus(0);
    //   setMsg("");
    // }, 5000);
  };

  const handleDateTimePicker = (dateValue) => {
    setDob(dateValue.$d);
  };

  const handleButtonChange = async () => {
    let formData = {};
    if (dob === null) {
      formData = {
        name: name,
        phone: phone,
      };
    } else if (phone === null) {
      formData = {
        name: name,
        dob: dob,
      };
    } else {
      formData = {
        name: name,
        dob: dob,
        phone: phone,
      };
    }

    const res = await updateInformationUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );

    // if (res?.statusCode === 200) {
    //   setStatus(1);
    //   setMsg("Cập nhật thông tin thành công");
    //   return;
    // } else {
    //   setStatus(2);
    //   setMsg("Cập nhật thông tin thất bại!");
    // }

    // setTimeout(() => {
    //   setStatus(0);
    //   setMsg("");
    // }, 3000);
  };

  const handleConnectSocialAcc = () => {
    try {
      window.open(
        `http://localhost:3000/api/auth/oauth2/google/${"http://localhost:8080/profile".replaceAll(
          "/",
          "@"
        )}/${user?.data.userInfo._id}`,
        "_self"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      sx={{
        paddingY: 5,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "center", lg: "flex-start" },
        width: "100%",
        backgroundColor: Colors.bgGray,
      }}
      spacing={2}
    >
      <Box paddingX={"10px"} align={"center"} sx={{ width: { xs: "70%", lg: "30%" } }}>
        <CustomComponent.ButtonAvatar onClick={handleClick}>
          <CustomComponent.ImageSrc
            style={{ backgroundImage: `url(${image})` }}
          />
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <CustomComponent.ImageBackdrop className="MuiImageBackdrop-root" />
          <CustomComponent.Image>
            <Box bgcolor={Colors.camera} borderRadius={"50%"} padding={"8px"}>
              <AiFillCamera color={Colors.black} size={25} />
            </Box>
          </CustomComponent.Image>
        </CustomComponent.ButtonAvatar>
      </Box>
      <Stack
        sx={{ width: { xs: "70%", lg: "40%" } }}
        className="form-personal-infor"
        spacing={2}
      >
        <Box sx={{ maxWidth: "450px", width: "70%" }}>
          <Typography>Họ & tên</Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactEmergencyIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: Colors.background }}
          />
        </Box>
        <Box sx={{ maxWidth: "450px", width: "70%" }}>
          <Typography>Số điện thoại</Typography>
          <TextField
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: Colors.background }}
          />
        </Box>
        <Box sx={{ maxWidth: "450px", width: "70%" }}>
          <Typography>Ngày sinh</Typography>
          <DateTimePicker
            valueDay={dob}
            handleDateTimePicker={handleDateTimePicker}
            sizeDateTime={"medium"}
          />
        </Box>
        <Box sx={{ maxWidth: "450px", width: "70%" }}>
          <Typography>Email</Typography>
          <TextField
            fullWidth
            defaultValue={email}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: Colors.background }}
          />
        </Box>
        <Box
          sx={{
            maxWidth: "450px",
            width: "70%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CustomComponent.Button1>Lưu thay đổi</CustomComponent.Button1>
        </Box>
      </Stack>
      <Stack
        spacing={2}
        className="form-connect-social-network"
        sx={{ width: { xs: "70%", lg: "40%" } }}
      >
        <Typography variant="button" display="block" gutterBottom>
          Liên kết mạng xã hội
        </Typography>
        <Box className="btn-connect">
          <Stack direction={"row"} spacing={2}>
            <img src={LogoGG} alt="Logo" width={25} height={25} />
            <Typography>Tài khoản GG</Typography>
          </Stack>
          <CustomComponent.Button2
            disabled={socialAcc}
            onClick={handleConnectSocialAcc}
          >
            Liên kết
          </CustomComponent.Button2>
        </Box>
      </Stack>
    </Stack>
  );
}

export default PersonalInformation;
