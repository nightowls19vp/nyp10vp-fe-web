import React, { useRef, useState } from "react";

import { TextField, Stack, Typography, Box } from "@mui/material";

import { createAxios } from "../../http/createInstance.js";

import "../../assets/css/Stock.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import {
  postStorageLocation,
  updateStorageLocation,
} from "../../redux/stockRequest";

function ModalEditStock({ item, grID, handleClose }) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [nameStock, setNameStock] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(null);
  const [nameImg, setNameImg] = useState("");
  const [status, setStatus] = useState(true);

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

  const handleEditStock = async () => {
    let formData = {
      name: nameStock,
      file: image,
      description: description,
    };
    const res = await updateStorageLocation(
      grID,
      item.id,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    handleClose();
  };

  //   const handleAddStock = async () => {
  //     let formData = {
  //         groupId: grID,
  //         name: nameStock,
  //         addedBy: user?.data.userInfo._id,
  //         file: image,
  //         description: description
  //     }

  //     await postStorageLocation(formData, user?.accessToken, dispatch, axiosJWT);
  //   };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ paddingBottom: "10px" }}
      >
        Chỉnh sửa kho
      </Typography>
      <Stack id="modalAddStock" spacing={2} className="modalModalAddStock">
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
          <CustomComponent.Button1 onClick={handleEditStock}>
            Lưu thay đổi
          </CustomComponent.Button1>
        </Box>
      </Stack>
    </Box>
  );
}

export default ModalEditStock;
