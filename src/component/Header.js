import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Avatar,
} from "@mui/material";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import MessageIcon from "@mui/icons-material/Message";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../assets/css/index.css";

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography> Megoo</Typography>
        <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Hinted search text"
            inputProps={{ "aria-label": "Hinted search text" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Tooltip title="Home">
          <IconButton
            type="button"
            sx={{ color: "#ffffff", alignItems: "center" }}
          >
            <HomeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Stock">
          <IconButton
            type="button"
            sx={{ color: "#ffffff", alignItems: "center" }}
          >
            <WarehouseIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Message">
          <IconButton
            type="button"
            sx={{ color: "#ffffff", alignItems: "center" }}
          >
            <MessageIcon sx={{ fontSize: 34 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Shopping">
          <IconButton
            type="button"
            sx={{ color: "#ffffff", alignItems: "center" }}
          >
            <ShoppingCartIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Account">
          <Button>
            {" "}
            <Avatar />{" "}
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
