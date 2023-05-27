import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";

import { MoMoIcon, ATMIcon } from "../../assets/icons";
import { Colors } from "../../config/Colors";
import "../../assets/css/Shopping.scss";
import ShoppingChildren from "./ShoppingChildren";
import { useSelector } from "react-redux";
import ShoppingCartEmpty from "./ShoppingCartEmpty";

function ShoppingParent() {
  const userCart = useSelector((state) => state.sidebar?.cart);
  const number = useSelector((state) => state.sidebar?.numberCart);
  return (
    <Stack paddingY={3} sx={{ paddingX: { xs: '2%', md: '5%', lg: '2%'}, width: '100%' }} >
      <Box className="shopping-cart">
        <CiShoppingCart size={50} color={Colors.textPrimary} />
        <Typography variant="h4" color={Colors.textPrimary}>
          Giỏ hàng
        </Typography>
      </Box>
      {number > 0 ? <ShoppingChildren item={userCart} /> : <ShoppingCartEmpty />}
    </Stack>
  );
}

export default ShoppingParent;
