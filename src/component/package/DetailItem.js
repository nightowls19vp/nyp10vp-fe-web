import React from "react";
import { Stack, Box, Typography, Divider } from "@mui/material";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";

function DetailItem({ item }) {
  const handleButtonShoppingCart = () => {

  };
  
  return (
    <>
      <Typography
        variant="button"
        display="block"
        fontSize={18}
        color={Colors.textPrimary}
        gutterBottom
      >
        {item.name}
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Box flex={3}>
          <Typography variant="h6" gutterBottom>
            Mô tả
          </Typography>
          <Typography variant="body2" align='justify' gutterBottom>
            {item.description}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={2}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" gutterBottom>
              Thời gian:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {item.duration}/ngày
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" gutterBottom>
              Số lượng thành viên:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {item.noOfMember}/người
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" gutterBottom>
              Giá tiền:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {item.price}/đồng
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <div className="group-btn">
        <div className="btn-package">
          <CustomComponents.Button2 onClick={handleButtonShoppingCart}>Thêm vào giỏ hàng</CustomComponents.Button2>
        </div>
        <div className="btn-package">
          <CustomComponents.Button1>Mua gói</CustomComponents.Button1>
        </div>
      </div>
    </>
  );
}

export default DetailItem;
