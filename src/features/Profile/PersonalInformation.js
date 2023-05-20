import React, { useRef, useState, useEffect } from "react";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { AiFillCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import LogoGG from "../../assets/img/google.png";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors";
import {
  updateInformationUser,
  updateAvatarUser,
  uploadFile,
} from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice.js";
import DateTimePicker from "../../component/Date/DateTimePicker";

function PersonalInformation() {
  const inputRef = useRef();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.user?.userInfo.user);

  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [image, setImage] = useState(userInfo.avatar);
  const email = userInfo.email;
  const [name, setName] = useState(userInfo.name);
  const [phone, setPhone] = useState(userInfo.phone ?? "");
  const [dob, setDob] = useState(userInfo.dob ?? "");
  const [socialAcc, setSocialAcc] = useState(userInfo?.socialAccounts ? true : false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async(event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    const form = new FormData();
    form.append('file', fileObj);
    const res = await uploadFile(user?.data.userInfo._id, user?.accessToken, form);
    
    const formAvatar = new FormData();
    formAvatar.append('avatar', res.data);
    const resImg = await updateAvatarUser(user?.data.userInfo._id, user?.accessToken, formAvatar, axiosJWT);
    console.log(resImg);
    setImage(res.data);
  };

  const handleDateTimePicker = (dateValue) => {
    setDob(dateValue);
  };

  const handleButtonChange = () => {
    let formData = {
      name: name,
      dob: dob,
      phone: phone,
    };
    updateInformationUser(
      user?.data.userInfo._id,
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
        <Box flex={2} paddingX={"10px"}>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Họ & tên
            </Typography>
            <TextField
              id="name"
              variant="outlined"
              size="small"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Email
            </Typography>
            <TextField
              disabled
              id="email"
              variant="outlined"
              size="small"
              defaultValue={email}
            />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Số điện thoại
            </Typography>
            <TextField
              id="phone"
              variant="outlined"
              size="small"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Ngày sinh
            </Typography>
            {/* <TextField
              id="dob"
              variant="outlined"
              size="small"
              defaultValue={dob}
              onChange={(e) => setDob(e.target.value)}
            /> */}
            <DateTimePicker
              valueDay={dob}
              handleDateTimePicker={handleDateTimePicker}
            />
          </Grid>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={1} paddingX={"10px"}>
          <Stack>
            <Typography variant="button" display="block" gutterBottom>
              Liên kết mạng xã hội
            </Typography>
            <Box className="form-connect-social-network">
              <Stack direction="row" spacing={"5px"}>
                <img src={LogoGG} alt="Logo" width={25} height={25} />
                <Typography display="block" gutterBottom>
                  Tài khoản GG
                </Typography>
              </Stack>
              <CustomComponent.Button2 size="small" disabled={socialAcc} onClick={handleConnectSocialAcc}>
                Liên kết
              </CustomComponent.Button2>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box className="btn-save">
        <Box flex={1} paddingX={"10px"}></Box>
        <Box flex={2} paddingX={"10px"} align={"right"}>
          <CustomComponent.Button1 onClick={handleButtonChange}>
            Lưu thay đổi
          </CustomComponent.Button1>
        </Box>
        <Box flex={1} paddingX={"10px"}></Box>
      </Box>
    </Stack>
  );
}

export default PersonalInformation;
