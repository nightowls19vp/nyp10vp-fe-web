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
    <Stack paddingY={3} paddingLeft={"2%"} paddingRight={"5%"}>
      <Box className="shopping-cart">
        <CiShoppingCart size={50} color={Colors.textPrimary} />
        <Typography variant="h4" color={Colors.textPrimary}>
          Giỏ hàng
        </Typography>
      </Box>
      {number > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ width: "70%", paddingY: "20px" }}>
            <ShoppingChildren item={userCart} />
          </Box>
          <Box sx={{ width: "30%", paddingY: "20px" }} className="method-total">
            <FormControl>
              <FormLabel id="radio-buttons-method-total">
                Chọn phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="zalo"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="zalo"
                  control={<Radio />}
                  label="Zalo"
                />
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label="Momo"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      ) : (
        <ShoppingCartEmpty />
      )}
    </Stack>
  );
}

export default ShoppingParent;
