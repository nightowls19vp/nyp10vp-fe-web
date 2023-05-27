import React, { useRef, useState, useEffect } from "react";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
  Paper,
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
  const refDate = useRef();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.user?.userInfo.user);

  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [image, setImage] = useState(userInfo.avatar ?? ImgAvatar);
  const email = userInfo.email;
  const [name, setName] = useState(userInfo.name);
  const [phone, setPhone] = useState(userInfo.phone ?? "");
  const [dob, setDob] = useState(userInfo.dob ?? null);
  const [socialAcc, setSocialAcc] = useState(
    userInfo?.socialAccounts ? true : false
  );
  const [widthDate, setWidthDate] = useState(0);

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
    console.log(resImg);
    setImage(res.data);
  };

  const handleDateTimePicker = (dateValue) => {
    setDob(dateValue.$d);
  };

  const handleButtonChange = () => {
    let formData = {
      name: name,
      dob: dob,
      phone: phone,
    };

    updateInformationUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );
  };

  const handleConnectSocialAcc = () => {
    try {
      window.open(
        `http://localhost:3000/api/auth/oauth2/google/${"http://localhost:8080/profile".replaceAll(
          "/",
          "@"
        )}/${user.data.userInfo._id}`,
        "_self"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setWidthDate(refDate.current.offsetWidth);
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
      >
        <Box flex={1} paddingX={"10px"} align={"center"}>
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
              <Box bgcolor={Colors.gray} borderRadius={"50%"} padding={"8px"}>
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
            <Box ref={refDate}>
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
      <Box className="btn-save">
        <Box flex={1} paddingX={"10px"}></Box>
        <Box flex={3} paddingX={"10px"} align={"center"}>
          <CustomComponent.Button1 onClick={handleButtonChange}>
            Lưu thay đổi
          </CustomComponent.Button1>
        </Box>
        <Box flex={2} paddingX={"10px"}></Box>
      </Box>
    </Stack>
  );
}

export default PersonalInformation;
