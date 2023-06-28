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
    let id = "649b0193d536e02035c7b191";
    navigate(`/stock/product-stock?id=${id}`);
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
          style={{ backgroundImage: `url(${item.image})` }}
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography> {item.name} </Typography>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontStyle: "italic"
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Slide>
        </CustomComponent.ImageStock>
      </CustomComponent.ImageButtonStock>
      <IconButton sx={{ position: "absolute", top: "0", right: "0" }}>
        <Box borderRadius={"20px"} padding={"5px"}>
          <EditIcon color={Colors.black} size={25} />
        </Box>
      </IconButton>
    </Box>
  );
}

export default ImageStock;
