import React from "react";

import { Stack, Typography, Box } from "@mui/material";

import { Colors } from "../../config/Colors";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";


function BoxTransaction() {
  return (
    <Stack spacing={1}>
      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
        Giao dịch gần đây
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 550,
            color: Colors.textPrimary,
          }}
        >
          Mã giao dịch:
        </Typography>
        <Typography
          variant="overline"
          display="block"
          sx={{ paddingLeft: "10px", fontSize: "18px" }}
        >
          AGHJ451GT4P
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 550,
            color: Colors.textPrimary,
          }}
        >
          Tổng tiền:{" "}
        </Typography>
        <Typography
          variant="overline"
          display="block"
          sx={{ paddingLeft: "10px", fontSize: "18px" }}
        >
          100.000 vnd
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <QueryBuilderIcon sx={{ color: Colors.textPrimary }} />
        <Typography
          variant="overline"
          display="block"
          sx={{ paddingLeft: "10px", fontSize: "18px" }}
        >
          2023-5-10
        </Typography>
      </Box>
    </Stack>
  );
}

export default BoxTransaction;
