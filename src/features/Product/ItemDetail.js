import React, { useRef, useState } from "react";

import {
  Autocomplete,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddIcon from "@mui/icons-material/Add";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { FaBarcode } from "react-icons/fa";

import { createAxios } from "../../http/createInstance";

import { Colors } from "../../config/Colors";
import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import { searchStorageLocation } from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

function ItemDetail({ item, grId }) {
  const inputRef = useRef();
  const avatarRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

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
  const [inputStorage, setInputStorage] = useState("");
  //const [purchase, setPurchase] = useState(purchaseLocation());
  const [listStorage, setListStorage] = useState([]);
  const [idStorage, setIdStorage] = useState();

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

  const searchDataStorageLocation = async (search) => {
    const res = await searchStorageLocation(
      grId,
      search,
      user?.accessToken,
      axiosJWT
    );

    if (res.statusCode === 200) {
      setListStorage(res.data);
    }
  };

  const handleChangeInputStorage = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataStorageLocation(character);
    }, 300);
    setInputStorage(character);
  };

  const handleSelectedStorage = (e, op) => {
    if (op != null) {
      setIdStorage(op.id);
    }
  };

  const handleChangeProduct = () => {

  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" gutterBottom sx={{ color: Colors.textPrimary }}>
        Thông tin chi tiết của nhu yếu phẩm
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          width: "100%",
          backgroundColor: Colors.bgGray,
        }}
        spacing={2}
      >
        <Box
          className="box-img-product"
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            height: "calc(100% - 40px)",
          }}
        >
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
                <Box
                  bgcolor={Colors.camera}
                  borderRadius={"50%"}
                  padding={"8px"}
                >
                  <AddAPhotoIcon color={Colors.black} size={25} />
                </Box>
              </CustomComponent.ImageProduct>
            </CustomComponent.ButtonProduct>
          </Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              label={"barcode"}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaBarcode />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Stack
          className="box-img-product"
          sx={{
            width: { xs: "100%", sm: "80%", md: "70%" },
            height: "calc(100% - 40px)",
          }}
          spacing={2}
        >
          <Box sx={{ width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" } }}>
            <Typography>Tên sản phẩm</Typography>
            <TextField
              multiline
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" },
            }}
          >
            <Box sx={{ mr: 1, mt: 1, mb: 1, }}>
              <Typography>Số lượng</Typography>
              <TextField
                id="outlined-start-adornment-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1,
                  step: 1,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">unit</InputAdornment>
                  ),
                }}
                sx={{ width: "130px" }}
              />
            </Box>
            <Box sx={{ m: 1,  }}>
              <Typography>Giá tiền</Typography>
              <TextField
                id="outlined-start-adornment-money"
                type="number"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1000,
                  step: 1000,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">vnd</InputAdornment>
                  ),
                }}
                sx={{ width: "150px" }}
              />
            </Box>
            <Box sx={{ ml: 1, mt: 1, mb: 1, width: "100%" }}>
              <Typography>Ngày hết hạn</Typography>
              <DateTimePicker
                valueDay={expDate}
                handleDateTimePicker={handleDateTimePicker}
                sizeDateTime={"medium"}
              />
            </Box>
          </Box>
          <Box sx={{ width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" } }}>
            <Typography>Vị trí lưu trữ</Typography>
            <Autocomplete
              id="free-solo-storage"
              freeSolo
              fullWidth
              options={listStorage}
              getOptionLabel={(option) => option.name}
              onChange={(e, op) => handleSelectedStorage(e, op)}
              inputValue={storage}
              onInputChange={(event, newInputValue) => {
                setStorage(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={inputStorage}
                  onChange={handleChangeInputStorage}
                  placeholder="Chọn vị trí"
                />
              )}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" },
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CustomComponent.Button1 onClick={handleChangeProduct}>Lưu thay đổi</CustomComponent.Button1>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ItemDetail;
