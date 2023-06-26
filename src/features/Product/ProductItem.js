import React, { useState } from "react";

import {
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import { MdOutlineAddBox } from "react-icons/md";

import { Colors } from "../../config/Colors";
import TableProduct from "./TableProduct.js";


function ProductItem() {

  const [open, setOpen] = useState(false);

  const handleAddProduct = (setOpen(true));
  
  return (
    <Stack
      spacing={3}
      sx={{
        paddingX: { xs: "2%", md: "5%" },
        width: "100%",
        paddingY: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs>
          <Link underline="hover" color={Colors.textPrimary} href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color={Colors.textPrimary} href="/stock">
            Kho lưu trữ
          </Link>
          <Typography color="text.primary"> Các sản phẩm trong kho </Typography>
        </Breadcrumbs>
        <IconButton onClick={handleAddProduct}>
          <MdOutlineAddBox color={Colors.textPrimary} size={30} />
        </IconButton>
      </Box>
      {open ? }
      <TableProduct />
    </Stack>
  );
}

export default ProductItem;
