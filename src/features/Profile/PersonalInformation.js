import React, { useState } from "react";
import { Stack, Box, Grid, TextField, Typography, Link, Divider } from "@mui/material";

import LogoGG from "../../assets/img/google.png";
import ImgAvatar from "../../assets/img/user.png";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import "../../assets/css/Content.scss";

function PersonalInformation({ status }) {
  const [image, setImage] = useState(ImgAvatar);
  return (
    <Stack
      direction="column"
      sx={{
        display: { xs: status ? "none" : "block", sm: "block" },
        width: { sx: "100%", sm: "70%" },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingRight: { xs: 5, sm: 10, md: 20 }, paddingY: 5 }}
      >
        <Box flex={2}>
          <img src={image} alt="Avatar" width={"50%"} />
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
      <Stack direction="row" justifyContent={"flex-end"} >
        <Box
          className="form-connect-social-network"
          sx={{ paddingRight: { xs: 5, sm: 10, md: 20 }, width: "40%" }}
        >
          <Grid className="logo-google" >
            <img src={LogoGG} alt="Logo" width={25} height={25} />
            <Typography pl={2}> Tài khoản google </Typography>
          </Grid>
          <CustomComponent.Button2 > Liên kết </CustomComponent.Button2>
        </Box>
      </Stack>
      <Box
        className="btn-save"
        sx={{ paddingRight: { xs: 5, sm: 10, md: 20 } }}
      >
        <CustomComponent.Button1 > Lưu thay đổi </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default PersonalInformation;
