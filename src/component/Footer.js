import React from "react";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";

import LogoFB from "../assets/img/facebook.png";
import LogoIns from "../assets/img/instagram.png";
import { MoMoIcon, ATMIcon } from "../assets/icons";

function Footer() {
  return (
    <Box bgcolor={"#FFC26B"} sx={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        paddingX={5}
        paddingY={2}
      >
        <Stack spacing={2}>
          <Typography> Về chúng tôi </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography> Phương thức thanh toán </Typography>
          <Stack
            direction="row"
            spacing={2}
            pl={2}
          >
            <MoMoIcon />
            <ATMIcon />
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography> Liên hệ với chúng tôi</Typography>
          <Stack direction="row" spacing={2}>
            <Button>
              <img src={LogoFB} alt="Logo" width={25} />
            </Button>
            <Button>
              <img src={LogoIns} alt="Logo" width={25} />
            </Button>
          </Stack>
          <Typography> Tải ứng dụng trên điện thoại </Typography>
        </Stack>
      </Grid>
    </Box>
  );
}

export default Footer;
