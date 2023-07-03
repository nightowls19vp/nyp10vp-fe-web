import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  Stack,
  TextField,
  Typography,
  ButtonBase,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClearIcon from "@mui/icons-material/Clear";

import { createAxios } from "../../http/createInstance";

import {
  getGroupProducts,
  searchGroupProducts,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Product.scss";
import "../../assets/css/Autocomplete.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";

function AddProduct({ grId, handleCreatePro }) {
  const inputRef = useRef(null);
  const boxRef = useRef();
  const observer = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const nowDate = new Date();
  const [prod, setProd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(nowDate);

  const [inputValue, setInputValue] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const getDataOfGroupProducts = async () => {
    const res = await getGroupProducts(
      grId,
      page,
      10,
      user?.accessToken,
      axiosJWT
    );
    setData(res);
  };

  const searchDataGroupProducts = async (search) => {
    const res = await searchGroupProducts(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    setData(res);
  };

  const handleFocusInput = async () => {
    await getDataOfGroupProducts();
    setFocusInput(!focusInput);
  };

  // const handleBlurInput = () => {
  //   setFocusInput(false);
  // };

  const handleChangeInput = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataGroupProducts(character);
    }, 500);
    setInputValue(character);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleSelectItem = (e, prod) => {
    setInputValue(prod.name);
    setFocusInput(false);
  };

  const handleScroll = () => {
    alert("handleScroll");
  };

  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(boxRef.current) &&
        event.target !== boxRef.current
      ) {
        setFocusInput(false);
      }
    };

    boxRef.current.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Stack spacing={2}>
      <Stack sx={{ width: "100%" }}>
        <Input
          value={inputValue}
          fullWidth
          onClick={handleFocusInput}
          // onFocus={handleFocusInput}
          // onBlur={handleBlurInput}
          onChange={handleChangeInput}
          ref={inputRef}
          endAdornment={
            <InputAdornment position="end">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {inputValue ? (
                  <IconButton sx={{ opacity: 0.5 }} onClick={handleClearInput}>
                    <ClearIcon />
                  </IconButton>
                ) : null}
                {focusInput ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Box>
            </InputAdornment>
          }
          sx={{ height: "20px" }}
        />
        {focusInput ? (
          <Box
            className="auto-input"
            id="id-auto-input"
            spacing={2}
            ref={boxRef}
          >
            {data != null
              ? data.map((x, idx) => (
                  <ButtonBase
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                    key={x.id}
                    onClick={(e) => handleSelectItem(e, x)}
                  >
                    <Typography className="text-displayed">{x.name}</Typography>
                  </ButtonBase>
                ))
              : null}
          </Box>
        ) : null}
      </Stack>
      {focusInput === false ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
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
              <Typography sx={{ minWidth: { xs: "120px" } }}>
                Số lượng:{" "}
              </Typography>
              <TextField
                sx={{ width: "100px" }}
                value={quantity}
                size="small"
              />
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
              <Typography sx={{ minWidth: { xs: "120px" } }}>
                Đơn vị:{" "}
              </Typography>
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
          {prod.length > 0 ? (
            <Box sx={{ textAlign: "end" }}>
              <CustomComponent.Button1>
                Thêm sản phẩm vào kho
              </CustomComponent.Button1>
            </Box>
          ) : (
            <Box sx={{ textAlign: "end" }}>
              <CustomComponent.Button1
                onClick={(event) => handleCreatePro(true)}
              >
                Tạo sản phẩm mới
              </CustomComponent.Button1>
            </Box>
          )}
        </Stack>
      ) : null}
    </Stack>
  );
}

export default AddProduct;
