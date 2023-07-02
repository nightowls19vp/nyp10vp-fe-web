import React, { useState } from "react";
import { Box, Typography, Slide, IconButton, Modal } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../config/Colors.js";
import ModalEditStock from "./ModalEditStock.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function ImageStock({ item, grID }) {
  const navigate = useNavigate();

  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickImage = () => {
    navigate(`/stock/product-stock?id=${item.id}`);
  };

  const handleUpdateStock = () => {
    setOpenEdit(true);
  };

  const handleClose = () => setOpenEdit(false);

  const handleCloseEdit = (status) => {
    setOpenEdit(status);
  }

  return (
    <Box
      sx={{
        padding: "10px",
        width: { xs: "40%", sm: "30%", md: "20%" },
        position: "relative",
      }}
    >
      <CustomComponent.ImageButtonStock
        focusRipple
        style={{
          width: "100%",
        }}
        onClick={handleClickImage}
        onMouseEnter={() => setOpenDetail(true)}
        onMouseLeave={() => setOpenDetail(false)}
      >
        <CustomComponent.ImageSrcStock
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <CustomComponent.ImageBackdropStock className="MuiImageBackdrop-root" />
        <CustomComponent.ImageStock>
          <Slide direction="up" in={openDetail} mountOnEnter unmountOnExit>
            <Box
              sx={{
                width: "100%",
                height: "40%",
                bgcolor: Colors.search,
                borderRadius: "0px 0px 20px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography> {item.name} </Typography>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontStyle: "italic",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Slide>
        </CustomComponent.ImageStock>
      </CustomComponent.ImageButtonStock>
      <IconButton
        sx={{ position: "absolute", top: "0", right: "0" }}
        onClick={handleUpdateStock}
      >
        <Box className="box-edit-stock">
          <EditIcon color={Colors.black} size={25} className="btn-edit-stock" />
        </Box>
      </IconButton>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-edit-stock"
        aria-describedby="modal-modal-edit-stock"
      >
        <Box sx={style}>
          <ModalEditStock item={item} grID={grID} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}

export default ImageStock;
