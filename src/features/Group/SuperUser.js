import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import { AiFillCamera, AiOutlineEdit } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { usersInvitePeople } from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Group.scss";
import ImgAvatar from "../../assets/img/user.png";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import PackagesGroup from "./PackagesGroup";

function SuperUser({ item }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.user?.userInfo.user);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [image, setImage] = useState(userInfo.avatar ?? ImgAvatar);
  const [linkInvite, setLinkInvite] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
  };

  const handleButtonInvite = async () => {
    const res = await usersInvitePeople(user?.accessToken, item._id, axiosJWT);
    let link = "http://localhost:8080";
    link += res.data;
    setLinkInvite(link);
  };

  return (
    <Stack spacing={3} padding={5}>
      <Box className="title-group">
        <Box paddingX={"10px"} align={"center"}>
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
        <Typography variant="h6"  > {item.name} </Typography>
        <IconButton >
          <AiOutlineEdit />
        </IconButton>
      </Box>

      <Typography
        variant="button"
        display="block"
        gutterBottom
        paddingTop={2}
        color={Colors.textPrimary}
      >
        Các gói người dùng có trong nhóm
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row" }}}>
        <Box flex={2} className="package-group">
          <Paper
            sx={{ paddingX: "10px", paddingTop: "10px", paddingBottom: "15px" }}
          >
            <Stack>
              <Typography variant="subtitle2" gutterBottom>
                Tên gói:
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" gutterBottom>
                Thời hạn:
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" gutterBottom>
                Số lượng thành viên:
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box flex={2}>
                <Button fullWidth variant="contained" color="success">
                  Kích hoạt gói
                </Button>
              </Box>
              <Box flex={2}>
                <CustomComponent.Button1 fullWidth>
                  Gia hạn gói
                </CustomComponent.Button1>
              </Box>
            </Stack>
          </Paper>
        </Box>
        <Box flex={3}>
          <PackagesGroup />
        </Box>
      </Box>

      <Box className="btn-invite">
        <CustomComponent.Button1
          sx={{ marginBottom: "10px" }}
          onClick={handleButtonInvite}
        >
          Mời thành viên
        </CustomComponent.Button1>
        {linkInvite ? (
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            value={linkInvite}
            sx={{ textOverflow: "ellipsis" }}
          />
        ) : null}
      </Box>
    </Stack>
  );
}

export default SuperUser;
