import React, { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MdOutlineInventory2, MdOutlineAddBox } from "react-icons/md";
import ImageStock from "./ImageStock";

import { Colors } from "../../config/Colors";
import "../../assets/css/Stock.scss";
import ImgAvatar from "../../assets/img/panda.jpg";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

const images = [
  {
    url: ImgAvatar,
    title: "Breakfast",
    width: "30%",
  },
  {
    url: ImgAvatar,
    title: "Burgers",
  },
  {
    url: ImgAvatar,
    title: "Camera",
  },
  {
    url: ImgAvatar,
    title: "iphone",
  },
];

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   [theme.breakpoints.down('sm')]: {
//     width: '100%'
//   },
//   bgcolor: "background.paper",
//   border: "1px solid #e6e6e6",
//   borderRadius: "20px",
//   boxShadow: 24,
//   p: 4,
// };

function StockItem() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      spacing={3}
      sx={{ paddingX: { xs: "2%", md: "5%" }, width: "100%", paddingY: "40px" }}
    >
      <Box className="title-stock" sx={{ justifyContent: "space-between" }}>
        <Box className="title-stock">
          <MdOutlineInventory2 color={Colors.textPrimary} size={50} />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Nơi lưu trữ
          </Typography>
        </Box>
        <Box className="title-stock">
          <IconButton onClick={handleOpen}>
            <MdOutlineAddBox color={Colors.textPrimary} size={30} />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CustomComponent.ModalBox>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Thêm kho mới
              </Typography>
              <Stack id="modal-modal-description" spacing={2}>
                <Box className="input-modal-description">
                  <Typography variant="body2" sx={{  width: '130px'}}> Nhập tên kho: </Typography>
                  <TextField size="small" fullWidth />
                </Box>
                <Box className="input-modal-description">
                  <Typography variant="body2" sx={{  width: '130px'}}> Nhập mô tả kho: </Typography>
                  <TextField size="small" multiline rows={3} fullWidth />
                </Box>
              </Stack>
            </CustomComponent.ModalBox>
          </Modal>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" },
          // minWidth: 300,
          width: "100%",
        }}
      >
        {images.map((img) => (
          <ImageStock item={img} key={img.title} />
        ))}
      </Box>
    </Stack>
  );
}

export default StockItem;
