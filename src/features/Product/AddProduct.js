import React, { useState, useRef, useEffect } from "react";

import {
  Box,
  Stack,
  TextField,
  Typography,
  ButtonBase,
  IconButton,
  InputAdornment,
  InputBase,
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
  const [pageProduct, setPageProduct] = useState(1);
  const [totalPageProduct, setTotalPageProduct] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const searchDataGroupProducts = async (search) => {
    const res = await searchGroupProducts(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    setProducts(res);
  };

  const getDataOfGroupProducts = async () => {
    setLoading(true);
    const res = await getGroupProducts(
      grId,
      pageProduct,
      10,
      user?.accessToken,
      axiosJWT
    );
    let all = new Set([...products, ...res.data]);
    console.log("data: ", all);
    setTotalPageProduct(res.meta.totalPages);
    setProducts([...all]);
    setLoading(false);
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

  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(boxRef.current) &&
        event.target !== boxRef.current
      ) {
        setFocusInput(false);
      }
    };
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   getGroupProducts(
  //     grId,
  //     pageProduct,
  //     10,
  //     user?.accessToken,
  //     axiosJWT
  //   ).then((res) => {
  //     console.log(res);
  //     setLoading(false);
  //   });
  // }, [axiosJWT, grId, pageProduct, user?.accessToken]);

  const lastProductElement = (node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageProduct((no) => no + 1);
        getDataOfGroupProducts();
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <Stack spacing={2}>
      <Stack sx={{ width: "100%" }}>
        <Box className="box-input-product">
          <InputBase
            value={inputValue}
            fullWidth
            placeholder="Chọn nhu yếu phẩm đã có trong kho"
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
                    <IconButton
                      sx={{ opacity: 0.5 }}
                      onClick={handleClearInput}
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : null}
                  {focusInput ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </Box>
              </InputAdornment>
            }
          />
        </Box>
        {focusInput ? (
          <Box
            className="auto-input"
            id="id-auto-input"
            spacing={2}
            ref={boxRef}
          >
            {products != null &&
              products.map((p, i) => {
                if (products.length === i + 1) {
                  return (
                    <div ref={lastProductElement} key={i}>
                      {p.name}
                    </div>
                  );
                } else {
                  return <div key={i}> {p.name} </div>;
                }
              })}
            <div>{loading && "loading..."}</div>
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
