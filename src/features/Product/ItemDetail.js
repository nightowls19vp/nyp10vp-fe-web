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

  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityMoins = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleMoneyPlus = () => {
    setMoney(money + 1000);
  };

  const handleMoneyMoins = () => {
    if (money > 1000) {
      setMoney(money - 1000);
    }
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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
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
                <AddAPhotoIcon color={Colors.black} size={25} />
              </Box>
            </CustomComponent.ImageProduct>
          </CustomComponent.ButtonProduct>
        </Box>
        <Box sx={{ width: "100%", paddingY: "5px" }}>
          <TextField
            label="Barcode"
            variant="filled"
            sx={{ width: "250px" }}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </Box>
      </Box>

      <Box flex={2} sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            <Box className="quantity-product">
              <Typography
                variant="subtitle1"
                sx={{ fontSize: 20, fontWeight: 500, minWidth: "150px" }}
              >
                Tên sản phẩm
              </Typography>
              <TextField
                multiline
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box className="flex-row-wrap">
              <TextField
                label="Số lượng"
                id="outlined-start-adornment-quantity"
                sx={{ m: 1, width: "130px" }}
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
              />
              <TextField
                label="Giá tiền"
                id="outlined-start-adornment-money"
                sx={{ m: 1, width: "150px" }}
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
              />
            </Box>
            <Box className="quantity-product">
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  minWidth: "150px",
                }}
              >
                Ngày hết hạn
              </Typography>
              <DateTimePicker
                valueDay={expDate}
                handleDateTimePicker={handleDateTimePicker}
                sizeDateTime={"medium"}
              />
            </Box>
            <Box className="quantity-product">
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
          </CardContent>
          <CardActions>
            <CustomComponent.Button2>Xóa sản phẩm</CustomComponent.Button2>
            <CustomComponent.Button1>Lưu thay đổi</CustomComponent.Button1>
            {/* <Box className="flex-flex-end">
            <Box sx={{ paddingRight: "5px" }}>
              <CustomComponent.Button1>Lưu thay đổi</CustomComponent.Button1>
            </Box>
            <Box sx={{ paddingLeft: "5px" }}>
              <CustomComponent.Button2>Xóa sản phẩm</CustomComponent.Button2>
            </Box>
            </Box> */}
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default ItemDetail;
