import React, { useState } from "react";
import { Box, Stack, Typography, Slide } from "@mui/material";

import * as CustomComponent from "../../component/custom/CustomComponents.js";
import ImgAvatar from "../../assets/img/panda.jpg";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../config/Colors.js";

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

function ImageStock({ item }) {
  const navigate = useNavigate();

  const [openDetail, setOpenDetail] = useState(false);

  const handleClickImage = () => {
    navigate(`/stock/product-stock?id=${item.title}`);
  };

  return (
    <Box sx={{ padding: "10px", width: { xs: "50%", sm: "40%", md: "30%" } }}>
      <CustomComponent.ImageButtonStock
        focusRipple
        style={{
          width: "100%",
        }}
        onClick={handleClickImage}
        onMouseEnter={() => setOpenDetail(true)}
        onMouseLeave={() => setOpenDetail(false)}
      >
        <CustomComponent.ImageSrcStock
          style={{ backgroundImage: `url(${item.url})` }}
        />
        <CustomComponent.ImageBackdropStock className="MuiImageBackdrop-root" />
        <CustomComponent.ImageStock>
          <Slide direction="up" in={openDetail} mountOnEnter unmountOnExit>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: Colors.search,
                borderRadius: "20px",
              }}
            >
              <Typography> {item.title} </Typography>
            </Box>
          </Slide>
        </CustomComponent.ImageStock>
      </CustomComponent.ImageButtonStock>
    </Box>
  );
}

export default ImageStock;
