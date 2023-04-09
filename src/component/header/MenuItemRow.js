import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

function MenuItemRow({ item, index, path }) {
  return (
    <Tooltip title={item.title}>
      <IconButton
        type="button"
        sx={{
          alignItems: "center",
        }}
      >
        <NavLink to={item.route}>
          {path === item.route ? item.iconFill : item.iconOutline }
        </NavLink>
      </IconButton>
    </Tooltip>
  );
}

export default MenuItemRow;
