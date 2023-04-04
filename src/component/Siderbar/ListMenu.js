import React from "react";
import { Stack } from "@mui/material";

function ListMenu({ children }) {
  return (
    <Stack spacing={2}>
      {children}
    </Stack>
  );
}

export default ListMenu;
