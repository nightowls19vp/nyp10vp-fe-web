import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import routesConfig from "../../config/routes.js";
import HomeIcon from "@mui/icons-material/Home";

function NavItem(title, toLink, icon) {
  return (
    <Tooltip title={title}>
      <NavLink to={toLink} >
        <IconButton
          type="button"
          sx={{ color: "#ffffff", alignItems: "center" }}
        >
          {icon}
        </IconButton>
      </NavLink>
    </Tooltip>
  );
}

export default NavItem;
