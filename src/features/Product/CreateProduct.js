import React, { useState } from "react";

import {
  Stack,
  Typography,
  Box,
  TextField,
  Autocomplete,
  IconButton,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import AddressVietNam from "../../component/Address/AddressVietNam";

function CreateProduct() {
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
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [war, setWar] = useState(null);
  const [addr1, setAddr1] = useState("");
  const [descrip, setDescrip] = useState("");
  const [flagAddr, setFlagAddr] = useState(false);

  const listAddress = [];

  const defaultProps = {
    options: listAddress,
    getOptionLabel: (option) => option.title,
  };

  const [addr, setAddr] = React.useState(null);
  const [inputAddr, setInputAddr] = React.useState("");

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleButtonAddAddress = () => {
    setFlagAddr(true);
  };

  const handleAddress = (prov, dis, war) => {
    setProvince(prov);
    setDistrict(dis);
    setWar(war);
  };
  return (
    <Stack spacing={2}>
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

        {flagAddr ? (
          <Stack spacing={2}>
            <AddressVietNam handleAddress={handleAddress} />
            <TextField
              fullWidth
              size="small"
              label="Địa chỉ cụ thể"
              value={addr1}
              onChange={(e) => setAddr1(e.target.value)}
            />
          </Stack>
        ) : (
          <Box className="d-flex">
            <Autocomplete
              fullWidth
              size="small"
              {...defaultProps}
              id="clear-on-escape"
              clearOnEscape
              noOptionsText="Không có địa chỉ"
              value={addr}
              onChange={(event, newValue) => {
                setAddr(newValue);
              }}
              inputValue={inputAddr}
              onInputChange={(event, newInputValue) => {
                setInputAddr(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn địa chỉ" />
              )}
            />
            <IconButton onClick={handleButtonAddAddress}>
              <ControlPointIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Box>
        )}
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
