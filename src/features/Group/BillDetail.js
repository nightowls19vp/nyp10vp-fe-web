import React, { useState } from "react";

import {
  MenuItem,
  Select,
  FormControl,
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import "../../assets/css/Bill.scss";

function BillDetail({ item, statusBill }) {
  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const [status, setStatus] = useState(statusBill);
  const date = new Date(item.date);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4">{item.summary}</Typography>
      <Stack spacing={2} id="modalBillDetail" className="modalModalBillDetail">
        <Typography variant="subtitle1">{date.toDateString()}</Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          {item.description}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 550 }}>
            Nguoi chi tra:
          </Typography>
          <Typography sx={{ marginLeft: "10px"}}>{item.lender}</Typography>
        </Box>
        <Box className="detail-bill-member">
          <Box flex={2}>
            <Avatar src="" />
            <Typography></Typography>
          </Box>
          <Box flex={1}>
            <Typography>0</Typography>
          </Box>
          {/* <Box>
            <FormControl
              sx={{
                width: "120px",
                backgroundColor:
                  status === "PENDING"
                    ? "#ccffdd"
                    : status === "APPROVED"
                    ? "#ccf5ff"
                    : "#f2f2f2",

                borderColor:
                  status === "PENDING"
                    ? "#ccffdd"
                    : status === "APPROVED"
                    ? "#ccf5ff"
                    : "#f2f2f2",
              }}
            >
              <Select
                labelId="demo-simple-select-status"
                id="demo-simple-status"
                size="small"
                value={status}
                // onChange={handleChange}
              >
                <MenuItem value={"PENDING"}>
                  <Typography
                    sx={{
                      color: "#008000",
                      fontWeight: 550,
                    }}
                  >
                    PENDING
                  </Typography>
                </MenuItem>
                <MenuItem value={"APPROVED"}>
                  <Typography
                    sx={{
                      color: "#0000cc",
                      fontWeight: 550,
                    }}
                  >
                    APPROVED
                  </Typography>
                </MenuItem>
                <MenuItem value={"CANCELED"}>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 550,
                    }}
                  >
                    CANCELED
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <Box
            sx={{
              width: "120px",
              backgroundColor:
                status === "PENDING"
                  ? "#ccffdd"
                  : status === "APPROVED"
                  ? "#ccf5ff"
                  : "#f2f2f2",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{
                color:
                  status === "PENDING"
                    ? "#008000"
                    : status === "APPROVED"
                    ? "#0000cc"
                    : "#000000",
                fontWeight: 550,
              }}
            >
              {status}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default BillDetail;
