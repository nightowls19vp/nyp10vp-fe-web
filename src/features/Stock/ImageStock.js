import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import * as CustomComponent from "../../component/custom/CustomComponents.js";
import ImgAvatar from "../../assets/img/panda.jpg";
import { useNavigate } from "react-router-dom";

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

function ImageStock() {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/stock/product-stock");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        minWidth: 300,
        width: "100%",
      }}
    >
      {images.map((image, idx) => (
        <Box key={idx} sx={{ padding: "10px", width: '30%' }}>
          <CustomComponent.ImageButtonStock
            focusRipple
            style={{
              width: "100%",
            }}
            onClick={handleButton}
          >
            <CustomComponent.ImageSrcStock
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <CustomComponent.ImageBackdropStock className="MuiImageBackdrop-root" />
            <CustomComponent.ImageStock>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <CustomComponent.ImageMarkedStock className="MuiImageMarked-root" />
              </Typography>
            </CustomComponent.ImageStock>
          </CustomComponent.ImageButtonStock>
        </Box>
      ))}
    </Box>
  );
}

export default ImageStock;
