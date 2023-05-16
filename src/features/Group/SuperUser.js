import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { getGroupByUserId } from "../../redux/userRequest";
import ModalInvitePeople from "./ModalInvitePeople";

function SuperUser() {
  const groupSU = useSelector((state) => state.user.groupSuperUser);

  return (
    <Stack spacing={3} padding={5}>
      <Box className="title-group">
        <Avatar
          alt="avatar-group"
          src=""
          sx={{ width: "150px", height: "150px", marginRight: "20px" }}
        />
        <Typography variant="h6"> {groupSU[0].name} </Typography>
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
      <Box flex={2}>
        <Paper >
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              Các thành viên
            </Typography>
            <ModalInvitePeople />
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

export default SuperUser;
