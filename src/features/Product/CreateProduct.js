import React, { useState } from "react";

import {
  Stack,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import { createAxios } from "../../http/createInstance";
import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import { searchPurchaseLocations } from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { Colors } from "../../config/Colors";

function CreateProduct({ grId, handleAddAddress }) {
  const nowDate = new Date();
  const [date, setDate] = useState(nowDate);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [region, setRegion] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [descrip, setDescrip] = useState("");
  const [addr, setAddr] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [listAddress, setListAdrress] = useState([]);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const searchDataPurchaseLocations = async (search) => {
    const res = await searchPurchaseLocations(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    let arr = [];
    for (let el of res) {
      let formData = {
        id: el.id,
        name:
          el.name +
          ", " +
          el.address.addressLine1 +
          ", " +
          el.address.wardName +
          ", " +
          el.address.districtName +
          ", " +
          el.address.provinceName,
      };
      arr.push(formData);
    }
    setListAdrress(arr);
  };

  const handleChangeInputAddress = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataPurchaseLocations(character);
    }, 200);
    setInputAddress(character);
  };

  const handleSelectedAddress = (e, op) => {
    if (op) {
      setAddr(op.id);
    } else {
      setAddr(null);
    }
  };

  return (
    <Stack spacing={2} id="createProduct" className="createCreateProduct">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <TextField
          fullWidth
          value={name}
          label="Tên sản phẩm"
          sx={{
            paddingRight: { xs: "0px", sm: "5px" },
            paddingBottom: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          value={barcode}
          label="Barcode"
          sx={{
            paddingLeft: { xs: "0px", sm: "5px" },
            paddingTop: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setBarcode(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Hạn sử dụng:</Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
          sizeDateTime={"medium"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <TextField
          size="small"
          fullWidth
          value={price}
          label="Giá tiền"
          sx={{
            paddingRight: { xs: "0px", sm: "5px" },
            paddingBottom: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          value={quantity}
          label="Số lượng"
          sx={{
            paddingX: { xs: "0px", sm: "5px" },
            paddingY: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          value={unit}
          label="Đơn vị"
          sx={{
            paddingLeft: { xs: "0px", sm: "5px" },
            paddingTop: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setUnit(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Region:</Typography>
        <TextField
          size="small"
          fullWidth
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Brand:</Typography>
        <TextField
          size="small"
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Category:</Typography>
        <TextField
          size="small"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Box>

      <Box className="d-flex" sx={{ width: "100%" }}>
        <Autocomplete
          id="free-solo-address"
          fullWidth
          freeSolo
          options={listAddress}
          getOptionLabel={(option) => option.name}
          onChange={(e, op) => handleSelectedAddress(e, op)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={inputAddress}
              onChange={handleChangeInputAddress}
              placeholder="Chọn nơi mua"
            />
          )}
        />
        <Tooltip title="Thêm địa chỉ mới">
          <IconButton onClick={handleAddAddress}>
            <AddLocationAltIcon
              sx={{ fontSize: "40px", color: Colors.textPrimary }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <TextField
        size="small"
        multiline
        value={descrip}
        rows={2}
        fullWidth
        label="Mô tả sản phẩm"
        onChange={(e) => setDescrip(e.target.value)}
      />
      <Box>
        <CustomComponent.Button2>Trở lại</CustomComponent.Button2>
        <CustomComponent.Button1>Thêm sản phẩm</CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default CreateProduct;
