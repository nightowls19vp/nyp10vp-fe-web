import React from "react";
import { Stack, Box, Typography } from "@mui/material";

import HomeImg from "../assets/img/Home.png";
import Modal from "../features/UserJoin/Modal";
import * as CustomComponent from "../component/custom/CustomComponents";
import "../assets/css/Home.scss";

function UserJoin() {
  return (
    <Stack className="home-image">
      {/* <Modal /> */}
      <Typography className="text-user-join">Bạn có một lời mời tham gia nhóm</Typography>
      <Box className="btn-user-join">
        <CustomComponent.Button1 className="btn-btn">
          Đồng ý
        </CustomComponent.Button1>
        <CustomComponent.Button1 className="btn-btn">
          Quay về trang chủ
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default UserJoin;
