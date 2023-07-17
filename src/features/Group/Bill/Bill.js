import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  ButtonBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FaMoneyBillWave } from "react-icons/fa";

import "../../../assets/css/Bill.scss";
import BillDetail from "./BillDetail";
import { useDispatch } from "react-redux";
import { updateBill } from "../../../redux/packageSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
  bgcolor: "background.paper",
  border:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function Bill({ grID, item }) {
  const dispatch = useDispatch();
  const day = new Date(item.date);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dispatch(updateBill(item));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonBase onClick={handleOpen} sx={{ height: "100px"}}>
        <Box sx={{ width: "90%", minWidth: "250px" }} className="bill">
          <Typography
            variant="h6"
            sx={{
              fontSize: 18,
              width: "30%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {item.summary}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
            }}
          >
            <FaMoneyBillWave size={25} />
            <Typography
              variant="overline"
              display="block"
              sx={{ paddingLeft: "10px", fontSize: "16px" }}
            >
              {item.total}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
            }}
          >
            <AccessTimeIcon />
            <Typography
              variant="overline"
              display="block"
              sx={{ fontStyle: "italic", paddingLeft: "10px" }}
            >
              {day.toDateString()}
            </Typography>
          </Box>
          <Box className="bill-end" sx={{ width: "30%" }}>
            <Avatar src={item.lender.avatar ?? ""} />
            <Box
              sx={{
                backgroundColor:
                  item.status === "PENDING"
                    ? "#ccffdd"
                    : item.status === "APPROVED"
                    ? "#ccf5ff"
                    : "#f2f2f2",

                color:
                item.status === "PENDING"
                    ? "#008000"
                    : item.status === "APPROVED"
                    ? "#0000cc"
                    : "#000000",

                marginLeft: "5px",
              }}
              className="status-bill"
            >
              <Typography sx={{ fontWeight: 600 }}>{item.status}</Typography>
            </Box>
          </Box>
        </Box>
      </ButtonBase>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-bill"
        aria-describedby="modal-modal-description-bill"
      >
        <Box sx={style}>
          <BillDetail grID={grID} />
        </Box>
      </Modal>
    </>
  );
}

export default Bill;
