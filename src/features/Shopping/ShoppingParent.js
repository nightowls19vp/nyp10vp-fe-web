import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";

import { Colors } from "../../config/Colors";
import "../../assets/css/Shopping.scss";
import { CheckBox } from "@mui/icons-material";
import ShoppingChildren from "./ShoppingChildren";

function ShoppingParent() {
  const [checked, setChecked] = React.useState([true, false]);

  
  return (
    <Stack paddingY={3} paddingLeft={"2%"} paddingRight={"5%"}>
      <Box className="shopping-cart">
        <CiShoppingCart size={50} color={Colors.textPrimary} />
        <Typography variant="h4" color={Colors.textPrimary}>
          Giỏ hàng
        </Typography>
      </Box>
      <Stack>
        <ShoppingChildren />
      </Stack>
    </Stack>
  );
}

export default ShoppingParent;
