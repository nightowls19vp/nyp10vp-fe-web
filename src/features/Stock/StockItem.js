import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MdOutlineInventory2, MdOutlineAddBox } from "react-icons/md";
import ImageStock from "./ImageStock";

import { Colors } from "../../config/Colors";
import "../../assets/css/Stock.scss";
import ImgAvatar from "../../assets/img/panda.jpg";

const images = [
  {
    url: ImgAvatar,
    title: "Breakfast",
    width: "30%",
  },
  {
    url: ImgAvatar,
    title: "Burgers",
  },
  {
    url: ImgAvatar,
    title: "Camera",
  },
  {
    url: ImgAvatar,
    title: "iphone",
  },
];

function StockItem() {
  return (
    <Stack
      spacing={3}
      sx={{ paddingX: { xs: "2%", md: "5%" }, width: "100%", paddingY: "40px" }}
    >
      <Box className="title-stock" sx={{ justifyContent: "space-between" }}>
        <Box className="title-stock">
          <MdOutlineInventory2 color={Colors.textPrimary} size={50} />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Nơi lưu trữ
          </Typography>
        </Box>
        <Box className="title-stock">
          <IconButton>
            <MdOutlineAddBox color={Colors.textPrimary} size={30} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between"},
          // minWidth: 300,
          width: "100%",
        }}
      >
        {images.map((img) =>
          <ImageStock item={img} key={img.title} />
        )}
      </Box>
    </Stack>
  );
}

export default StockItem;
