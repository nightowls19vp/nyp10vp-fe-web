import React, { useState } from "react";

import {
  Stack,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import SelectedAddress from "../../component/address/SelectedAddress";

function CreateProduct({ grId }) {
  const nowDate = new Date();
  const [date, setDate] = useState(nowDate);

  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [region, setRegion] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inputAddress, setInputAddress] = useState();
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [war, setWar] = useState(null);
  const [addr1, setAddr1] = useState("");
  const [descrip, setDescrip] = useState("");

  const listAddress = [];

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleSelectedAddress = (id) => {
    setInputAddress(id);
  };

  return (
    <Stack spacing={2} id="idAddProduct" className="addAddProduct">
      <Typography>Thêm sản phẩm</Typography>
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

        <SelectedAddress
            grID={grId}
            handleSelectedAddress={handleSelectedAddress}
          />

        <TextField
          size="small"
          multiline
          value={descrip}
          rows={2}
          fullWidth
          label="Mô tả sản phẩm"
          onChange={(e) => setDescrip(e.target.value)}
        />
      </Stack>
      <Box sx={{ textAlign: "end" }}>
        <CustomComponent.Button1>Thêm sản phẩm</CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default CreateProduct;
