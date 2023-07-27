import React from "react";

import {
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
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ShortTextIcon from "@mui/icons-material/ShortText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Colors } from "../../config/Colors";
import * as FormatNumber from "../../component/custom/FormatDateNumber";

function BoxNotification({ bill }) {
  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <AttachMoneyIcon />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          title={bill.summary}
          subheader={FormatNumber.formatDate(bill.date)}
          action={
            <IconButton>
              <ClearIcon sx={{ color: Colors.error }} />
            </IconButton>
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"></Typography>
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
