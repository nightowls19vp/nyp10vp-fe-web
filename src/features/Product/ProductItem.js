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

import { Colors } from "../../config/Colors";
import ListItemProduct from "./ListItemProduct.js";
import AddProduct from "./AddProduct";
import CreateProduct from "./CreateProduct";
import AddressVietNam from "../../component/Address/AddressVietNam";

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

function ProductItem() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleCreatePro = (flag) => {
    setOpenAdd(false);
    setOpenCreate(true);
  }

  const handleCloseCreatePro = () => setOpenCreate(false);

  // const handleAddress = (p, d, w) => {
  //   console.log(p, d, w);
  // }

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
          <Typography color="text.primary"> Các sản phẩm trong kho </Typography>
        </Breadcrumbs>
        <IconButton onClick={handleOpenAdd}>
          <MdOutlineAddBox color={Colors.textPrimary} size={30} />
        </IconButton>
      </Box>
      <ListItemProduct />
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-add-product"
        aria-describedby="modal-modal-product"
      >
        <Box sx={style}>
          <AddProduct handleCreatePro={handleCreatePro} />
        </Box>
      </Modal>

      <Modal
        open={openCreate}
        onClose={handleCloseCreatePro}
        aria-labelledby="modal-modal-add-product"
        aria-describedby="modal-modal-product"
      >
        <Box sx={style}>
          <CreateProduct />
        </Box>
      </Modal>
      {/* <AddressVietNam handleAddress={handleAddress} /> */}
    </Stack>
  );
}

export default ProductItem;
