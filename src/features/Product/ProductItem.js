import React, { useState } from "react";

import {
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  IconButton,
  Box,
  Modal,
} from "@mui/material";

import { MdOutlineAddBox } from "react-icons/md";

import { createAxios } from "../../http/createInstance";

import { Colors } from "../../config/Colors";
import ListItemProduct from "./ListItemProduct.js";
import AddProduct from "./AddProduct";
import CreateProduct from "./CreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import AddAddress from "./AddAddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function ProductItem({ grId, storageID }) {
  const listProducts = useSelector((state) => state?.stock?.listProduct.data);
  const metaProducts = useSelector((state) => state?.stock?.listProduct.meta);

  const [openAdd, setOpenAdd] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const handleOpenAdd = () => {
    setOpenAddress(false);
    setOpenCreate(false);
    setOpenAdd(true);
  };

  const handleCreatePro = () => {
    setOpenAdd(false);
    setOpenCreate(true);
  };

  const handleAddress = () => {
    setOpenAdd(false);
    setOpenAddress(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseCreatePro = () => setOpenCreate(false);
  const handleCloseAddress = () => setOpenAddress(false);

  return (
    <Stack
      spacing={3}
      sx={{
        paddingX: { xs: "2%", md: "5%" },
        width: "100%",
        paddingY: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs>
          <Link underline="hover" color={Colors.textPrimary} href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color={Colors.textPrimary} href="/stock">
            Kho lưu trữ
          </Link>
          <Typography color="text.primary"> Nhu yếu phẩm trong kho </Typography>
        </Breadcrumbs>
        <IconButton onClick={handleOpenAdd}>
          <MdOutlineAddBox color={Colors.textPrimary} size={30} />
        </IconButton>
      </Box>
      {listProducts?.length > 0 ? (
        <ListItemProduct
          item={listProducts}
          p={metaProducts}
          grId={grId}
          storageID={storageID}
        />
      ) : null}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-add-product"
        aria-describedby="modal-modal-product"
      >
        <Box sx={style}>
          <AddProduct
            grId={grId}
            storageID={storageID}
            handleCreatePro={handleCreatePro}
            handleAddAddress={handleAddress}
            handleCloseAdd={handleCloseAdd}
          />
        </Box>
      </Modal>

      <Modal
        open={openCreate}
        onClose={handleCloseCreatePro}
        aria-labelledby="modal-modal-creat-product"
        aria-describedby="modal-modal-product"
      >
        <Box sx={style}>
          <CreateProduct
            grId={grId}
            storageID={storageID}
            handleAddAddress={handleAddress}
            handleOpenAdd={handleOpenAdd}
            handleCloseCreatePro={handleCloseCreatePro}
          />
        </Box>
      </Modal>

      <Modal
        open={openAddress}
        onClose={handleCloseAddress}
        aria-labelledby="modal-modal-add-address"
        aria-describedby="modal-modal-address"
      >
        <Box sx={style}>
          <AddAddress grID={grId} handleCloseAddress={handleCloseAddress} />
        </Box>
      </Modal>
    </Stack>
  );
}

export default ProductItem;
