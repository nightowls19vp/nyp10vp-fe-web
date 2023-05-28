import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import * as CustomComponent from "../../component/custom/CustomComponents.js";
import ImgAvatar from "../../assets/img/user.png";
import { useNavigate } from "react-router-dom";

const images = [
  {
    url: "../../assets/img/google.png",
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: "../../assets/img/google.png",
    title: 'Burgers',
    width: '30%',
  },
  {
    url: "../../assets/img/google.png",
    title: 'Camera',
    width: '30%',
  },
];

function ImageStock() {
  const avatar = ImgAvatar;
  const navigate = useNavigate();
  const handleButton = () => {
    console.log("vy");
    navigate("/product-stock");
  }
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image, idx) => (
        <CustomComponent.ImageButtonStock
          focusRipple
          key={idx}
          style={{
            width: image.width,
          }}
          onClick={handleButton}
        >
          <CustomComponent.ImageSrcStock style={{ backgroundImage: `url(${avatar})` }} />
          <CustomComponent.ImageBackdropStock className="MuiImageBackdrop-root" />
          <CustomComponent.ImageStock>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
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
      ))}
    </Box>
  );
}

export default ImageStock;
