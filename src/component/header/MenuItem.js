import React, { useState, useEffect } from "react";
import { IconButton, Grid, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

function MenuItem({ item, path }) {
  return (
    <Grid>
      <Tooltip title={item.title}>
        <IconButton
          type="button"
          sx={{
            alignItems: "center",
          }}
        >
          <NavLink to={item.route}>
            {path === item.route ? item.iconFill : item.iconOutline}
          </NavLink>
        </IconButton>
      </Tooltip>
    </Grid>
  );
}

export default MenuItem;
