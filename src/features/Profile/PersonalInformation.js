import React, { useState } from "react";
import { Stack, Box, Grid, TextField, Typography } from "@mui/material";
import ImgAvatar from "../../assets/img/user.png";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import "../../assets/css/Content.scss";

function PersonalInformation({ info }) {
  const [image, setImage] = useState(ImgAvatar);
  return (
    <Stack direction="column" >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        paddingY={2}
      >
        <img src={image} alt="Avatar" width={"30%"} />
        <Box>
          <Grid className="form-personal-infor">
            <Typography p={2}> Họ & tên </Typography>
            <TextField id="name" variant="outlined" defaultValue={info.username} />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography p={2}> Email </Typography>
            <TextField id="email" variant="outlined" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography p={2}> Số điện thoại </Typography>
            <TextField id="phone" variant="outlined" />
          </Grid>
          <Grid className="form-personal-infor">
            <Typography p={2}> Ngày sinh </Typography>
            <TextField id="dob" variant="outlined" />
          </Grid>
        </Box>
      </Stack>
      <Box className="btn-save" >
        <CustomComponent.Button2 > Lưu thay đổi </CustomComponent.Button2>
      </Box>
    </Stack>
  );
}

export default PersonalInformation;
