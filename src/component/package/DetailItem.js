import React, { Fragment } from "react";
import { Stack, Box, Typography } from "@mui/material";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";

function DetailItem() {
  return (
    <Stack>
      <Typography
        variant="button"
        display="block"
        fontSize={18}
        color={Colors.textPrimary}
        gutterBottom
      >
        Gói 1
      </Typography>
      
      <div className="group-btn">
        <div className="btn-package">
          <CustomComponents.Button2 >
            Thêm vào giỏ hàng
          </CustomComponents.Button2>
        </div>
        <div className="btn-package" >
          <CustomComponents.Button1 >
            Mua gói
          </CustomComponents.Button1>
        </div>
      </div>
    </Stack>
  );
}

export default DetailItem;
