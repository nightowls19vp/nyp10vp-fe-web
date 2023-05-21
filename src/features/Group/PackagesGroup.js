import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

function PackagesGroup() {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          width={"100px"}
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
          width={"100px"}
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
          width={"100px"}
          variant="subtitle2"
          fontSize={16}
          gutterBottom
        >
          Thành viên:
        </Typography>
        <Typography fontSize={16} gutterBottom>
          XXXXX
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", paddingLeft: "15px" }}>
        <PersonOutlinedIcon />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button variant="contained" color="success" sx={{ width: '140px', marginRight: '10px'}}>
          Kích hoạt gói
        </Button>
        <CustomComponent.Button2 sx={{ width: '140px' }}> Gia hạn gói </CustomComponent.Button2>
      </Box>
    </Stack>
  );
}

export default PackagesGroup;
