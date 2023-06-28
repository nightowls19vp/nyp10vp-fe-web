import React, { useState } from "react";

import {
  Autocomplete,
  Box,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";

function AddProduct({ item, handleCreatePro }) {
  console.log(item);
  const nowDate = new Date();
  const [prod, setProd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(nowDate);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleChangeProduct = (e) => {
    setProd(e.target.value);
  };

  return (
    <Stack spacing={2}>
      <Box className="d-flex">
        
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          },
        }}
      >
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: { xs: "10px", sm: "0px" },
          }}
        >
          <Typography sx={{ minWidth: { xs: "120px" } }}>Số lượng: </Typography>
          <TextField sx={{ width: "100px" }} value={quantity} size="small" />
        </Box>
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: { xs: "10px", sm: "0px" },
          }}
        >
          <Typography sx={{ minWidth: { xs: "120px" } }}>Đơn vị: </Typography>
          <TextField sx={{ width: "100px" }} value={unit} size="small" />
        </Box>
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Hạn sử dụng:</Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
        />
      </Box>
      {prod !== null || prod.length > 0 ? (
        <Box sx={{ textAlign: "end" }}>
          <CustomComponent.Button1>
            Thêm sản phẩm vào kho
          </CustomComponent.Button1>
        </Box>
      ) : (
        <Box sx={{ textAlign: "end" }}>
          <CustomComponent.Button1 onClick={(event) => handleCreatePro(true)}>
            Tạo sản phẩm mới
          </CustomComponent.Button1>
        </Box>
      )}
    </Stack>
  );
}

export default AddProduct;
