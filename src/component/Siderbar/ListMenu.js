import React from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { Grid, Stack, Typography } from "@mui/material";

function ListMenu({ children }) {
  return (
    <Stack>
      {children}
    </Stack>
  );
}

export default ListMenu;
