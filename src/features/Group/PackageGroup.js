import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";

function PackageGroup() {
  const [btn, setBtn] = useState(true);
  return (
      <Stack
        spacing={2}
        sx={{
          width: "70%",
          bgcolor: Colors.box,
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Tên gói:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            XXXXX
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Thời hạn:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            XXXXX
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Số thành viên:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            XXXXX
          </Typography>
        </Box>

        <Box>
          {btn ? (
            <Button variant="contained" color="success" sx={{ width: "140px" }}>
              Kích hoạt gói
            </Button>
          ) : (
            <CustomComponent.Button2 sx={{ width: "140px" }}>
              Gia hạn gói
            </CustomComponent.Button2>
          )}
        </Box>
      </Stack>
  );
}

export default PackageGroup;
