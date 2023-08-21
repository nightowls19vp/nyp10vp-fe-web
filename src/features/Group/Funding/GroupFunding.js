import React from "react";

import { Box, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { GiReceiveMoney } from "react-icons/gi";
import "../../../assets/css/Funding.scss";
import { Colors } from "../../../config/Colors";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import AddIcon from "@mui/icons-material/Add";
import FormFunding from "./FormFunding";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: { xs: "95%", sm: "80%", md: "70%", lg: "50%" },
  //height: "50%",
  bgcolor: "background.paper",
  border:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function GroupFunding() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Stack sx={{ width: "100%" }}>
      <Box className="funding-box">
        <Box className="title-group-funding">
          <GiReceiveMoney className="icon-title" />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Quản lý tiền chung
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <CustomComponent.Button1 onClick={handleOpen}>
            <AddIcon color={Colors.background} />
            Thêm
          </CustomComponent.Button1>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <Tooltip title="Thêm">
            <CustomComponent.Button1 onClick={handleOpen}>
              <AddIcon color={Colors.background} />
            </CustomComponent.Button1>
          </Tooltip>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
            <FormFunding />
        </Box>
      </Modal>
    </Stack>
  );
}

export default GroupFunding;
