import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { RiShoppingBasket2Line } from "react-icons/ri";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../../component/custom/CustomComponents.js";
import { useNavigate } from "react-router-dom";

function ShoppingCartEmpty() {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/package");
  };
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      paddingY={5}
    >
      <RiShoppingBasket2Line color={Colors.textPrimary} size={"15%"} />
      <Typography variant="h5" gutterBottom>
        Không có sản phẩm nào trong giỏ hàng của bạn
      </Typography>
      <CustomComponents.Button1 sx={{ width: "10%" }} onClick={handleButton}>
        Mua ngay
      </CustomComponents.Button1>
    </Stack>
  );
}

export default ShoppingCartEmpty;
