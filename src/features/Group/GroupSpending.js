import React, { useEffect, useState } from "react";

import {
  Stack,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { Colors } from "../../config/Colors";
import FormSpending from "./FormSpending";

function GroupSpending({ item }) {

  const [open, setOpen] = useState(false);

  // let listMember = [];

  // useEffect(() => {
  //   for (let member of item.members) {
  //     let formData = {
  //       _id: member.user.user._id,
  //       name: member.user.user.name,
  //     };
  //     listMember.push(formData);
  //   }
  //   let formData = {
  //     _id: "648406c2549163797aa486ww",
  //     name: "user2",
  //   };
  //   listMember.push(formData);
  // }, [item, listMember])
  const handleAddFormSpending = () => {
    setOpen(true);
  }

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

      <Box className="modal-content-group-spending" sx={{ alignItems: "center" }}>
        <Typography>
          Quản lý hóa đơn chi tiêu bên ngoài
        </Typography>
        <IconButton onClick={handleAddFormSpending}>
          <AddIcon color={Colors.black} />
        </IconButton>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center"}}>
      <FormSpending item={item} />
      </Box>
    </Stack>
  );
}

export default GroupSpending;
