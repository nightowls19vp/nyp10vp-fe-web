import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ModalInvitePeople from "./ModalInvitePeople";
import { usersInvitePeople } from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";

function SuperUser({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [linkInvite, setLinkInvite] = useState("");

  const handleButtonInvite = async () => {
    const res = await usersInvitePeople(user?.accessToken, item._id, axiosJWT);
    let link = "http://localhost:8080";
    link += res.data;
    setLinkInvite(link);
  };

  return (
    <Stack spacing={3} padding={5}>
      <Box className="title-group">
        <Avatar
          alt="avatar-group"
          src=""
          sx={{ width: "150px", height: "150px", marginRight: "20px" }}
        />
        <Typography variant="h6"> ten goi </Typography>
        <IconButton>
          <AiOutlineEdit />
        </IconButton>
      </Box>
      <Box>
        <Stack>
          <Typography
            variant="subtitle2"
            fontSize={20}
            paddingTop={2}
            gutterBottom
          >
            Thông tin gói
          </Typography>
          <Box>
            <Typography variant="subtitle2" fontSize={16} gutterBottom>
              Tên gói:
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontSize={16} gutterBottom>
              Ngày mua:
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontSize={16} gutterBottom>
              Hạn sử dụng:
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontSize={16} gutterBottom>
              Số tiền:
            </Typography>
          </Box>
        </Stack>
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
