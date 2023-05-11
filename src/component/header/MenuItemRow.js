import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import configRoutes from "../../config/routes.js";
import { privateRoutes } from "../../routes/index.js";

function MenuItemRow({ item, path, user }) {
  return (
    <Tooltip title={item.title}>
      <IconButton
        type="button"
        sx={{
          alignItems: "center",
        }}
      >
        <Badge
          badgeContent={4}
          color="primary"
          invisible={item.title === "Shopping" ? false : true}
        >
          {privateRoutes.map(({ path }) => path).includes(item.route) ? (
            <NavLink to={user ? item.route : configRoutes.login}>
              {path === item.route ? item.iconFill : item.iconOutline}
            </NavLink>
          ) : (
            <NavLink to={item.route}>
              {path === item.route ? item.iconFill : item.iconOutline}
            </NavLink>
          )}
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

export default MenuItemRow;
