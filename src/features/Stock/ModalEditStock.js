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
import {
  deletedStorageLocation,
  postStorageLocation,
  updateStorageLocation,
} from "../../redux/stockRequest";
import { updateMessage, updateOpenSnackbar, updateStatus } from "../../redux/messageSlice.js";

function ModalEditStock({ item, grID, handleClose }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [nameStock, setNameStock] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(null);
  const [fileImg, setFileImg] = useState(item.image);
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
    setFileImg(URL.createObjectURL(fileObj));
  };

  const handleEditStock = async () => {
    let formData = {
      name: nameStock,
      file: image,
      description: description,
    };
    setFlag(true);
    const res = await updateStorageLocation(
      grID,
      item.id,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      setFlag(false);
      if (res?.statusCode === 200) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Chỉnh sửa kho lưu trữ thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Chỉnh sửa kho lưu trữ thất bại!"));
      }
    }

    handleClose();
  };

  const handleDeleteStock = async () => {
    const res = await deletedStorageLocation(
      grID,
      item.id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      setFlag(false);
      if (res?.statusCode === 200) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Xóa kho lưu trữ thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Xóa kho lưu trữ thất bại!"));
      }
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
        Chỉnh sửa kho
      </Typography>
      <Box className="d-flex-stock">
        {fileImg !== null ? (
          <Box flex={1} sx={{ marginRight: "10px" }}>
            <img src={fileImg} alt="ImageStock" className="file-image" />
          </Box>
        ) : null}

        <Box flex={3}>
          <Stack id="modalAddStock" spacing={2} className="modalModalAddStock">
            <CustomComponent.Button2
              onClick={handleClick}
              sx={{ width: "fit-content" }}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "115px",
                  },
                  marginY: "3px",
                  marginRight: { xs: "0px", md: "3px" },
                }}
              >
                <CustomComponent.Button2 fullWidth onClick={handleDeleteStock}>
                  Xóa kho
                </CustomComponent.Button2>
              </Box>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "115px",
                  },
                  marginY: "3px",
                  marginLeft: { xs: "0px", md: "3px" },
                }}
              >
                <CustomComponent.Button1 fullWidth onClick={handleEditStock}>
                  Lưu thay đổi
                </CustomComponent.Button1>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
      {flag && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default ModalEditStock;
