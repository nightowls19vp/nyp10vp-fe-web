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
import ClearIcon from "@mui/icons-material/Clear";

import { createAxios } from "../../http/createInstance";

import {
  addItemsToStorage,
  searchGroupProducts,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Product.scss";
import "../../assets/css/Autocomplete.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import SelectedAddress from "../../component/Address/SelectedAddress";

function AddProduct({ grId, storageID, handleCreatePro }) {
  const inputRef = useRef(null);
  const boxRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const nowDate = new Date();
  const [prod, setProd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(nowDate);

  const [inputProduct, setInputProduct] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [products, setProducts] = useState([]);

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

  const handleFocusInput = async () => {
    setFocusInput(!focusInput);
  };

  const handleChangeInput = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataGroupProducts(character);
    }, 500);
    setInputProduct(character);
  };

  const handleClearInput = () => {
    setInputProduct("");
    setProducts("");
  };

  const handleSelectItem = (e, prod) => {
    setInputProduct(prod.name);
    setProd(prod.id);
    setFocusInput(false);
    setProducts("");
  };

  const handleSelectedAddress = (id) => {
    setInputAddress(id);
  };

  const handleAddProd = async () => {
    let formData = {
      addedBy: user?.data.userInfo._id,
      bestBefore: date,
      quantity: quantity,
      unit: unit,
      groupProductId: prod,
      storageLocationId: storageID,
      purchaseLocationId: inputAddress,
    };

    await addItemsToStorage(formData, user?.accessToken, dispatch, axiosJWT);
  };

  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(boxRef.current) &&
        event.target !== boxRef.current
      ) {
        setInputProduct("");
        setProducts("");
      }
    };
  }, []);

  return (
    <Stack spacing={2} id="idAddProduct" className="addAddProduct">
      <Stack sx={{ width: "100%" }}>
        <Box className="box-input-product">
          <InputBase
            value={inputProduct}
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
                  {inputProduct ? (
                    <IconButton
                      sx={{ opacity: 0.5 }}
                      onClick={handleClearInput}
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : null}
                </Box>
              </InputAdornment>
            }
          />
        </Box>
        {inputProduct ? (
          <Box
            className="auto-input"
            id="id-auto-input"
            ref={boxRef}
            sx={{ width: `calc(100% - 10px)` }}
          >
            {products !== null &&
              products.length > 0 &&
              products.map((p, idx) => (
                <ButtonBase
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingY: "5px",
                  }}
                  onClick={(e) => handleSelectItem(e, p)}
                  key={idx}
                  className="box-input-search"
                >
                  <Typography className="text-displayed">{p.name}</Typography>
                </ButtonBase>
              ))}
          </Box>
        ) : null}
      </Stack>
      {products.length === 0 || inputProduct === "" ? (
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
                Số lượng:
              </Typography>
              <TextField
                sx={{ width: "100px" }}
                value={quantity}
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
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
                Đơn vị:
              </Typography>
              <TextField
                sx={{ width: "100px" }}
                value={unit}
                size="small"
                onChange={(e) => setUnit(e.target.value)}
              />
            </Box>
          </Box>
          <Box className="d-flex">
            <Typography sx={{ minWidth: "120px" }}>Hạn sử dụng:</Typography>
            <DateTimePicker
              valueDay={date}
              handleDateTimePicker={handleDateTimePicker}
            />
          </Box>
          <SelectedAddress
            grID={grId}
            handleSelectedAddress={handleSelectedAddress}
          />
          {prod.length > 0 ? (
            <Box sx={{ textAlign: "end" }}>
              <CustomComponent.Button1 onClick={handleAddProd}>
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
