import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "../../assets/css/Home.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { FaMoneyBillWave } from "react-icons/fa";
import ShortTextIcon from "@mui/icons-material/ShortText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Colors } from "../../config/Colors";
import * as FormatNumber from "../../component/custom/FormatDateNumber";

function BoxNotification({ bill }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      {/* <Box
        flex={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <AttachMoneyIcon
          sx={{
            backgroundColor: Colors.btnOutline,
            padding: "20px",
            fontSize: "36px",
            borderRadius: "50%"
          }}
        />
      </Box> */}
      <Box flex={3} sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={
            <AttachMoneyIcon
              sx={{
                color: Colors.textPrimary,
                borderRadius: "50%",
                backgroundColor: Colors.btnOutline,
                padding: "5px",
              }}
            />
          }
          title={bill.summary}
          subheader={FormatNumber.formatDate(bill.date)}
          action={
            <IconButton>
              <ClearIcon sx={{ color: Colors.error }} />
            </IconButton>
          }
        />
        <CardContent>
          <Box className="box-date">
            <FaMoneyBillWave />
            <Typography variant="h5" component="div" sx={{ marginLeft: "5px"}}>
              {FormatNumber.formatCurrency(bill.total)}
            </Typography>
          </Box>
          <Box className="box-date">
            <ShortTextIcon />
            <Typography
              variant="body2"
              color="text.secondary"
              className="box-datetime"
            >
              {bill.description}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export default BoxNotification;
