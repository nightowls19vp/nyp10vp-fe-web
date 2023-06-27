import React, { useState } from "react";
import { Box, Typography, Slide, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../config/Colors.js";

function ImageStock({ item }) {
  const navigate = useNavigate();

  const [openDetail, setOpenDetail] = useState(false);

  const handleClickImage = () => {
    navigate(`/stock/product-stock?id=${item.title}`);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        width: { xs: "40%", sm: "30%", md: "20%" },
        position: "relative",
      }}
    >
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
                height: "40%",
                bgcolor: Colors.search,
                borderRadius: "0px 0px 20px 20px",
              }}
            >
              <Typography> {item.title} </Typography>
            </Box>
          </Slide>
        </CustomComponent.ImageStock>
      </CustomComponent.ImageButtonStock>
      <IconButton sx={{ position: "absolute", top: "35%", left: "40%" }}>
        <Box bgcolor={Colors.camera} borderRadius={"50%"} padding={"8px"}>
          <EditIcon color={Colors.black} size={25} />
        </Box>
      </IconButton>
    </Box>
  );
}

export default ImageStock;
