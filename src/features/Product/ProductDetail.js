import React from "react";
import { Stack, Breadcrumbs,
  Link, Typography } from "@mui/material";
import { Colors } from "../../config/Colors";

function ProductDetail() {
  return (
    <Stack
      spacing={3}
      sx={{
        paddingX: { xs: "2%", md: "5%" },
        width: "100%",
        paddingY: "40px",
      }}
    >
      <Breadcrumbs>
        <Link underline="hover" color={Colors.textPrimary} href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color={Colors.textPrimary} href="/stock">
          Kho lưu trữ
        </Link>
        <Link underline="hover" color={Colors.textPrimary} href="/stock">
        Các sản phẩm trong kho
        </Link>
        <Typography color="text.primary"> sản phẩm  </Typography>
      </Breadcrumbs>
    </Stack>
  );
}

export default ProductDetail;
