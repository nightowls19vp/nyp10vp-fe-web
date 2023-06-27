import React, { useState } from "react";

import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";

function AddProduct({ handleCreatePro }) {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];

  const nowDate = new Date();
  const [prod, setProd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(nowDate);

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  return (
    <Stack spacing={2}>
      <Box className="d-flex">
        <Autocomplete
          fullWidth
          {...defaultProps}
          id="clear-on-escape"
          clearOnEscape
          noOptionsText="Không có sản phẩm"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn sản phẩm đã có"
              variant="standard"
            />
          )}
        />
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
      {value !== null ? (
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
