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
import ModalAddStock from "./ModalAddStock";

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function StockItem({ item }) {
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
            <Box sx={style}>
              <ModalAddStock />
            </Box>
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
        {item.map((stock) => (
          stock ? (<ImageStock item={stock} key={stock.id} />) : null
        ))}
      </Box>
    </Stack>
  );
}

export default StockItem;
