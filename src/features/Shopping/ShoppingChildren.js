import React, { useState } from "react";
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";

import Item from "./Item.js";


function ShoppingChildren() {
  const cart = useSelector((state) => state.sidebar.cart);

  const columns = [
    {field: 'id', headerName: 'Các gói người dùng', width: 90},
    {field: 'quantity', headerName: 'Số lượng', width: 150},
    {field: 'money', headerName: 'Số tiền', width: 150},
    {field: 'activity', headerName: 'Thao tác', width: 150},
  ];

  const rows = cart?.map((row) => ({
    id: row.package,
    quantity: row.quantity,
    money: 0,
    activity: 'Xóa',
  }))

  return (
    <Box sx={{ width: "100%" }}>
      <Item item={cart} />
    </Box>
  );
}

export default ShoppingChildren;
