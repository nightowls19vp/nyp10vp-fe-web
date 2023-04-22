import React, { useState } from "react";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";

import LogoGG from "../../assets/img/google.png";
import ImgAvatar from "../../assets/img/user.png";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors";
import VD from "./vd.js";

function PersonalInformation() {
  const [image, setImage] = useState(ImgAvatar);
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
          <CustomComponent.ButtonAvatar>
            <CustomComponent.ImageSrc
              style={{ backgroundImage: `url(${image})` }}
            />
            <CustomComponent.ImageBackdrop className="MuiImageBackdrop-root" />
            <CustomComponent.Image>
              <AiOutlineEdit color={Colors.text} size={25} />
            </CustomComponent.Image>
          </CustomComponent.ButtonAvatar>
        </Box>
        <Box flex={2} paddingX={"10px"}>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Họ & tên
            </Typography>
            <TextField id="name" variant="outlined" size="small" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Email
            </Typography>
            <TextField id="email" variant="outlined" size="small" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Số điện thoại
            </Typography>
            <TextField id="phone" variant="outlined" size="small" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography variant="overline" display="block" gutterBottom pr={2}>
              Ngày sinh
            </Typography>
            <TextField id="dob" variant="outlined" size="small" />
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
                <Typography display="block" gutterBottom >
                  Tài khoản GG
                </Typography>
              </Stack>
              <CustomComponent.Button2 size="small">
                Liên kết
              </CustomComponent.Button2>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box
        className="btn-save"
      >
        <Box flex={1} paddingX={"10px"}></Box>
        <Box flex={2} paddingX={"10px"} align={"right"} >
          <CustomComponent.Button1 > Lưu thay đổi </CustomComponent.Button1>
        </Box>
        <Box flex={1} paddingX={"10px"}></Box>
      </Box>
    </Stack>
  );
}

export default PersonalInformation;
