import React from "react";

import { Box } from "@mui/material";
import Bill from "./Bill";

import "../../assets/css/Bill.scss";
import { useSelector } from "react-redux";

function ListBill({ grID }) {
  const listBill = useSelector((state) => state?.package?.bill);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: { xs: "center", sm: "center", md: "flex-start" },
        paddingY: "10px",
        width: "100%",
      }}
    >
      {listBill.map((bill) =>
        bill ? <Bill key={bill._id} item={bill} grID={grID} /> : null
      )}
    </Box>
  );
}

export default ListBill;
