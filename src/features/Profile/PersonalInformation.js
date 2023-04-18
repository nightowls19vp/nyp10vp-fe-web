import React, { useState } from "react";
import {
  Stack,
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import LogoGG from "../../assets/img/google.png";
import ImgAvatar from "../../assets/img/user.png";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import "../../assets/css/Content.scss";

function PersonalInformation() {
  const [image, setImage] = useState(ImgAvatar);
  return (
    <Box>
      <Stack
        sx={{
          paddingRight: { xs: 0, sm: 10, md: 20 },
          paddingBottom: 5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
        }}
      >
        <Box
          flex={2}
          align={"center"}
          sx={{ paddingBottom: { xs: "10px", sm: 0 } }}
        >
          <img src={image} alt="Avatar" width={"50%"} />
          {/* <IconButton >
            <EditIcon />
          </IconButton> */}
        </Box>
        <Box flex={3}>
          <Grid className="form-personal-infor">
            <Typography p={2}> Họ & tên </Typography>
            <TextField id="name" variant="outlined" size="small" />
            {/* <TextField id="name" variant="outlined" defaultValue={info.username} /> */}
          </Grid>
          <Grid className="form-personal-infor">
            <Typography p={2}> Email </Typography>
            <TextField id="email" variant="outlined" size="small" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography p={2}> Số điện thoại </Typography>
            <TextField id="phone" variant="outlined" size="small" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography p={2}> Ngày sinh </Typography>
            <TextField id="dob" variant="outlined" size="small" />
          </Grid>
        </Box>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "center", sm: "flex-end" },
        }}
      >
        <Box
          className="form-connect-social-network"
          sx={{ paddingRight: { xs: 5, sm: 10, md: 20 } }}
        >
          <Grid className="logo-google" paddingRight={3}>
            <img src={LogoGG} alt="Logo" width={25} height={25} />
            <Typography pl={2}> Tài khoản google </Typography>
          </Grid>
          <CustomComponent.Button2> Liên kết </CustomComponent.Button2>
        </Box>
      </Stack>
      <Box
        className="btn-save"
        sx={{ paddingRight: { xs: 0, sm: 10, md: 20 } }}
      >
        <CustomComponent.Button1> Lưu thay đổi </CustomComponent.Button1>
      </Box>
    </Box>
  );
}

export default PersonalInformation;
