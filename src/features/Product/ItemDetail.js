import React, { useRef, useState } from "react";

import {
  Box,
  Input,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AiFillCamera } from "react-icons/ai";

import { Colors } from "../../config/Colors";
import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";

function ItemDetail({ item }) {
  const inputRef = useRef();
  const avatarRef = useRef();

  const purchaseLocation = () => {
    let addr =
      item?.purchaseLocation.address.addressLine1 +
      ", " +
      item?.purchaseLocation.address.wardName +
      ", " +
      item?.purchaseLocation.address.districtName +
      ", " +
      item?.purchaseLocation.address.provinceName;
    return addr;
  };

  const [image, setImage] = useState(item?.image);
  const [name, setName] = useState(item?.groupProduct.name);
  const [barcode, setBarcode] = useState(item?.groupProduct.barcode);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [money, setMoney] = useState(item?.groupProduct.price ?? 0);
  const [expDate, setExpDate] = useState(item?.bestBefore);
  const [storage, setStorage] = useState(item?.storageLocation.name);
  const [purchase, setPurchase] = useState(purchaseLocation());

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

  const handleDateTimePicker = (dateValue) => {
    setExpDate(dateValue.$d);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box flex={1} className="flex-column">
        <Box paddingX={"10px"} align={"center"} ref={avatarRef}>
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
            <CustomComponent.ImageProduct>
              <Box bgcolor={Colors.camera} borderRadius={"50%"} padding={"8px"}>
                <AiFillCamera color={Colors.black} size={25} />
              </Box>
            </CustomComponent.ImageProduct>
          </CustomComponent.ButtonProduct>
        </Box>
        <Box sx={{ width: "100%" }}>
          <TextField
            label="Barcode"
            variant="filled"
            sx={{ width: "250px" }}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </Box>
      </Box>
      <Box flex={2}>
        <Box className="quantity-product">
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 20, fontWeight: 500, width: "150px" }}
          >
            Tên sản phẩm
          </Typography>
          <TextField
            multiline
            sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box className="flex-row-wrap">
          <Box className="quantity-product">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: 20, fontWeight: 500, width: "150px" }}
            >
              Số lượng
            </Typography>
            <Input
              variant="standard"
              value={quantity}
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: 18, fontWeight: 400 }}
                  >
                    unit
                  </Typography>
                </InputAdornment>
              }
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
          <Box className="quantity-product">
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 20,
                fontWeight: 500,
                width: { xs: "150px", sm: "100px" },
              }}
            >
              Giá tiền
            </Typography>
            <Input
              variant="standard"
              value={money}
              endAdornment={
                <InputAdornment position="end">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: 18, fontWeight: 400 }}
                  >
                    VND
                  </Typography>
                </InputAdornment>
              }
              onChange={(e) => setMoney(e.target.value)}
            />
          </Box>
        </Box>
        <Box
          className="quantity-product"
          sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 20,
              fontWeight: 500,
              width: { xs: "150px", sm: "200px" },
            }}
          >
            Hết hạn
          </Typography>
          <DateTimePicker
            valueDay={expDate}
            handleDateTimePicker={handleDateTimePicker}
          />
        </Box>
        <Box className="quantity-product">
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 20, fontWeight: 500, width: "150px" }}
          >
            Vị trí
          </Typography>
          <TextField
            sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}
            value={storage}
          />
        </Box>
        <Box className="quantity-product">
          <LocationOnIcon sx={{ color: Colors.textPrimary }} />
          <Typography>{purchase}</Typography>
        </Box>
        <Box className="flex-flex-end">
          <Box sx={{ paddingRight: "5px" }}>
            <CustomComponent.Button1 >
              Lưu thay đổi
            </CustomComponent.Button1>
          </Box>
          <Box sx={{ paddingLeft: "5px" }}>
            <CustomComponent.Button2 >
              Xóa sản phẩm
            </CustomComponent.Button2>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ItemDetail;
