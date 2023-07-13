import React, { useRef, useState } from "react";

import {
  TextField,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { createAxios } from "../../http/createInstance.js";

import "../../assets/css/Stock.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { postStorageLocation } from "../../redux/stockRequest";

function ModalAddStock({ grID, handleClose }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [nameStock, setNameStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [nameImg, setNameImg] = useState("");
  const [flag, setFlag] = useState(false);

  const handleChangeNameStock = (e) => {
    setNameStock(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setImage(fileObj);
    setNameImg(fileObj.name);
  };

  const handleAddStock = async () => {
    let formData = {
      groupId: grID,
      name: nameStock,
      addedBy: user?.data.userInfo._id,
      file: image,
      description: description,
    };
    setFlag(true);
    const res = await postStorageLocation(
      grID,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res) {
      setFlag(false);
    }

    handleClose();
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ paddingBottom: "10px" }}
      >
        Thêm kho mới
      </Typography>
      <Stack
        id="modalAddStock"
        spacing={2}
        className="modalModalAddStock"
        sx={{ opacity: flag ? 0.5 : 1 }}
      >
        <Box className="input-modal-description">
          <CustomComponent.Button2
            onClick={handleClick}
            sx={{ minWidth: "150px" }}
          >
            <Typography variant="body2">Chọn hình ảnh</Typography>
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </CustomComponent.Button2>
          <Typography className="name-image-stock">{nameImg}</Typography>
        </Box>
        <Box className="input-modal-description">
          <Typography variant="body2" sx={{ minWidth: "130px" }}>
            Nhập tên kho:
          </Typography>
          <TextField
            value={nameStock}
            size="small"
            fullWidth
            onChange={(e) => handleChangeNameStock(e)}
          />
        </Box>
        <Box className="input-modal-description">
          <Typography variant="body2" sx={{ minWidth: "130px" }}>
            Nhập mô tả kho:
          </Typography>
          <TextField
            value={description}
            size="small"
            multiline
            rows={2}
            fullWidth
            onChange={(e) => handleChangeDescription(e)}
          />
        </Box>
        <Box sx={{ textAlign: "end" }}>
          <CustomComponent.Button1 onClick={handleAddStock}>
            Tạo kho mới
          </CustomComponent.Button1>
        </Box>
      </Stack>
      {flag && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default ModalAddStock;
