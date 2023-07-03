import React, { useRef, useState } from "react";

import { Box, Stack, TextField, Typography } from "@mui/material";

import { AiFillCamera } from "react-icons/ai";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

function ItemDetail({ item }) {
  const inputRef = useRef();
  const dateRef = useRef();
  const avatarRef = useRef();

  const [image, setImage] = useState(item?.image);
  const [name, setName] = useState(item?.groupProduct.name);
  const [barcode, setBarcode] = useState(item?.groupProduct.barcode);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [money, setMoney] = useState(item?.groupProduct.price);
  const [expDate, setExpDate] = useState(item?.bestBefore);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setImage(fileObj);
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Box className="d-flex">
        <Box paddingX={"10px"} align={"center"} ref={avatarRef} sx={{ width: "30%"}}>
          <CustomComponent.ButtonProduct onClick={handleClick}>
            <CustomComponent.ImageSrcProduct
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
          </CustomComponent.ButtonProduct>
        </Box>
        <Box className="d-flex" sx={{ paddingX: "10px", width: "50%" }}>
          <Typography
            variant="button"
            display="block"
            sx={{ minWidth: "150px" }}
          >
            Tên sản phẩm
          </Typography>
          <TextField
            size="small"
            fullWidth
            multiline
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box className="d-flex" sx={{ paddingX: "10px" }}>
          <Typography
            variant="button"
            display="block"
            sx={{ minWidth: "80px" }}
          >
            Barcode
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </Box>
      </Box>
      <Box className="d-flex">
        <Box className="quantity-product" sx={{ paddingLeft: "30%" }}>
          <Typography
            variant="button"
            display="block"
            sx={{ paddingRight: "10px" }}
          >
            Số lượng
          </Typography>
          <TextField
            size="small"
            value={quantity}
            sx={{ width: "60px"}}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Typography sx={{ paddingX: "10px"}}>{item?.unit}</Typography>
        </Box>
        <Box className="quantity-product" sx={{ paddingX: "10px" }}></Box>
      </Box>
    </Stack>
  );
}

export default ItemDetail;
