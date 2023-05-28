import React, { useState, useRef } from "react";

import { Box, Stack, Typography, TextField } from "@mui/material";

import { AiFillCamera } from "react-icons/ai";
import ImgAvatar from "../../assets/img/user.png";

import "../../assets/css/Product.scss";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

function ProductDetail() {
  const inputRef = useRef();

  const [image, setImage] = useState(ImgAvatar);
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");
  const [name5, setName5] = useState("");
  const [name6, setName6] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
  };
  return (
    <Box className="box-product">
      <Box sx={{ width: "30%" }}>
        <CustomComponent.ButtonAvatar onClick={handleClick}>
          <CustomComponent.ImageSrc
            style={{ backgroundImage: `url(${image})` }}
          />
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <CustomComponent.ImageBackdrop className="MuiImageBackdrop-root" />
          <CustomComponent.Image>
            <Box bgcolor={Colors.camera} borderRadius={"50%"} padding={"8px"}>
              <AiFillCamera color={Colors.black} size={25} />
            </Box>
          </CustomComponent.Image>
        </CustomComponent.ButtonAvatar>
      </Box>
      <Stack sx={{ width: "60%" }} spacing={2}>
        <Box className="detail-product">
          <Typography width={"130px"} variant="overline" display="block">
            Tên sản phẩm
          </Typography>
          <Box>
            <TextField
              fullWidth
              id="name"
              variant="outlined"
              size="small"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="detail-product">
          <Typography width={"130px"} variant="overline" display="block">
            Tên sản phẩm
          </Typography>
          <Box>
            <TextField
              fullWidth
              id="name"
              variant="outlined"
              size="small"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="detail-product">
          <Typography width={"130px"} variant="overline" display="block">
            Tên sản phẩm
          </Typography>
          <Box>
            <TextField
              fullWidth
              id="name"
              variant="outlined"
              size="small"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="detail-product">
          <Typography width={"130px"} variant="overline" display="block">
            Tên sản phẩm
          </Typography>
          <Box>
            <TextField
              fullWidth
              id="name"
              variant="outlined"
              size="small"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductDetail;
