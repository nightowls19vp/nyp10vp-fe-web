import React, { useEffect, useState } from "react";

import { Stack, Box, Typography, IconButton, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { Colors } from "../../config/Colors";
import FormSpending from "./FormSpending";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: "70%", lg: "50%" },
  bgcolor: "background.paper",
  border: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function GroupSpending({ item }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let listMember = [];

  for (let member of item.members) {
    let formData = {
      _id: member.user.user._id,
      name: member.user.user.name,
    };
    listMember.push(formData);
  }
  let formData = {
    _id: "648406c2549163797aa486ww",
    name: "user2",
  };
  listMember.push(formData);
  formData = {
    _id: "648406c2549163797aa486wu",
    name: "user3",
  };
  listMember.push(formData);

  return (
    <Stack>
      <Box className="title-group-spending">
        <MonetizationOnOutlinedIcon
          sx={{
            paddingRight: "10px",
            color: Colors.textPrimary,
            fontSize: "50px",
          }}
        />
        <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
          Quản lý chi tiêu trong nhóm
        </Typography>
      </Box>

      <Box
        className="modal-content-group-spending"
        sx={{ alignItems: "center" }}
      >
        <Typography>Quản lý hóa đơn chi tiêu bên ngoài</Typography>
        <IconButton onClick={handleOpen}>
          <AddIcon color={Colors.black} />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormSpending grID={item._id} item={listMember} />
        </Box>
      </Modal>
      {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "center"}}>
      <FormSpending item={listMember} />
      </Box> */}
    </Stack>
  );
}

export default GroupSpending;
