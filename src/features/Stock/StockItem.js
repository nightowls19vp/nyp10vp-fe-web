import React, { useState } from "react";
import {
  Alert,
  Box,
  IconButton,
  Modal,
  Snackbar,
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function StockItem({ item, grID }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      spacing={3}
      sx={{ marginX: "5%" }}
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
              <ModalAddStock grID={grID} handleClose={handleClose} />
            </Box>
          </Modal>
        </Box>
      </Box>

      {item.length > 0 ? <ImageStock item={item} grID={grID} /> : null }
      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
          // minWidth: 300,
          width: "100%",
        }}
      >
        {item.map((stock) =>
          stock ? <ImageStock item={stock} grID={grID} key={stock.id} /> : null
        )}
      </Box> */}
    </Stack>
  );
}

export default StockItem;
