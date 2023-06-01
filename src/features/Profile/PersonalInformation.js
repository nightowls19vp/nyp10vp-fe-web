import React, { useRef, useState, useEffect } from "react";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Typography,
  Alert,
  Paper,
  AlertTitle,
} from "@mui/material";
import { AiFillCamera } from "react-icons/ai";
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
  const [phone, setPhone] = useState(userInfo.phone ?? null);
  const [dob, setDob] = useState(userInfo.dob ?? null);
  // const [socialAcc, setSocialAcc] = useState(
  //   userInfo.socialAccounts !== undefined ? true : false
  // );
  const socialAcc = userInfo.socialAccounts !== undefined ? true : false;
  const [widthDate, setWidthDate] = useState(0);
  const [widthAvatar, setWidthAvatar] = useState(0);
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
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

    if (resImg.statusCode === 200) {
      setImage(res.data);
      setStatus(1);
      setMsg("Cập nhật thông tin thành công");
    } else {
      setStatus(2);
      setMsg("Cập nhật thông tin thất bại!");
    }

    setTimeout(() => {
      setStatus(0);
      setMsg("");
    }, 5000);
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

    if (res?.statusCode === 200) {
      setStatus(1);
      setMsg("Cập nhật thông tin thành công");
      return;
    } else {
      setStatus(2);
      setMsg("Cập nhật thông tin thất bại!");
    }

    setTimeout(() => {
      setStatus(0);
      setMsg("");
    }, 3000);
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

  useEffect(() => {
    setWidthDate(dateRef.current.offsetWidth);
    setWidthAvatar(avatarRef.current.offsetWidth);
  }, []);

  return (
    <Stack
      sx={{
        backgroundColor: Colors.background,
        borderRadius: "10px",
      }}
    >
      <Stack
        sx={{
          paddingY: 5,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          width: "100%",
        }}
        spacing={2}
      >
        <Box flex={1} paddingX={"10px"} align={"center"} ref={avatarRef}>
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
        <Box flex={3} paddingX={"10px"}>
          <Grid className="form-personal-infor">
            <Typography
              width={"100px"}
              variant="overline"
              display="block"
              gutterBottom
            >
              Họ & tên
            </Typography>
            <Box sx={{ width: `${widthDate}px` }}>
              <TextField
                fullWidth
                id="name"
                variant="outlined"
                size="small"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid className="form-personal-infor">
            <Typography
              width={"100px"}
              variant="overline"
              display="block"
              gutterBottom
            >
              Email
            </Typography>
            <Box sx={{ width: `${widthDate}px` }}>
              <TextField
                fullWidth
                disabled
                id="email"
                variant="outlined"
                size="small"
                defaultValue={email}
              />
            </Box>
          </Grid>
          <Grid className="form-personal-infor">
            <Typography
              width={"100px"}
              variant="overline"
              display="block"
              gutterBottom
            >
              Số điện thoại
            </Typography>
            <Box sx={{ width: `${widthDate}px` }}>
              <TextField
                fullWidth
                id="phone"
                variant="outlined"
                size="small"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid className="form-personal-infor">
            <Typography
              width={"100px"}
              variant="overline"
              display="block"
              gutterBottom
            >
              Ngày sinh
            </Typography>
            <Box ref={dateRef}>
              <DateTimePicker
                valueDay={dob}
                handleDateTimePicker={handleDateTimePicker}
              />
            </Box>
          </Grid>
        </Box>

        <Box
          flex={2}
          paddingX={"10px"}
          bgcolor={Colors.search}
          sx={{
            paddingX: "10px",
            bgcolor: Colors.search,
            width: { xs: `calc(${widthDate}px + 100px)`, md: "100%" },
          }}
          className="form-connect-social-network"
        >
          <Stack paddingX={"5px"} paddingTop={"10px"} paddingBottom={"15px"}>
            <Typography variant="button" display="block" gutterBottom>
              Liên kết mạng xã hội
            </Typography>
            <Box className="connect-social-network">
              <Stack direction="row" spacing={"5px"}>
                <img src={LogoGG} alt="Logo" width={25} height={25} />
                <Typography display="block" gutterBottom>
                  Tài khoản GG
                </Typography>
              </Stack>
              <CustomComponent.Button2
                size="small"
                disabled={socialAcc}
                onClick={handleConnectSocialAcc}
              >
                Liên kết
              </CustomComponent.Button2>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          paddingLeft: { xs: "0px", md: `calc(${widthAvatar}px + 120px)` },
        }}
      >
        <CustomComponent.Button1 onClick={handleButtonChange}>
          Lưu thay đổi
        </CustomComponent.Button1>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {status === 0 ? null : status === 1 ? (
          <Alert severity="success">
            <AlertTitle>Thành công</AlertTitle>
            {msg}
          </Alert>
        ) : (
          <Alert severity="error">
            <AlertTitle>Thất bại</AlertTitle>
            {msg}
          </Alert>
        )}
      </Box>
    </Stack>
  );
}

export default PersonalInformation;
