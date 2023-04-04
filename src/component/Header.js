import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Stack,
  InputBase,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import GiteOutlinedIcon from "@mui/icons-material/GiteOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsChatDots, BsChatDotsFill, BsCart, BsCartFill } from "react-icons/bs";
import { MdOutlineWarehouse, MdWarehouse } from "react-icons/md";

import routesConfig from "../config/routes.js";
import * as CustomComponent from "../component/custom/CustomComponents.js";
import "../assets/css/Header.scss";

function Header() {
  // console.log(window.location.pathname);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFC26B" }}>
      <Toolbar>
        <Typography flex={2} color={"#ffffff"}>
          {" "}
          Megoo
        </Typography>
        <Box
          sx={{
            p: "2px 4px",
            display: "flex",
            flex: 2,
            alignItems: "center",
            borderRadius: "25px",
            backgroundColor: "#F0F2F5",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#6B6D71" }}
            placeholder="Hinted search text"
            inputProps={{ "aria-label": "Hinted search text" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ color: "#6B6D71", p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Stack flex={3} direction="row" justifyContent="end" spacing={2}>
          <Tooltip title="Home">
            <IconButton
              type="button"
              sx={{ color: "#ffaa33", alignItems: "center" }}
            >
              <NavLink to={routesConfig.home}>
                {/* <HomeIcon sx={{ fontSize: 40 }} /> */}
                <AiFillHome size={35} color="#ffffff" />
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Stock">
            <IconButton
              type="button"
              sx={{ color: "#8c8c8c", alignItems: "center" }}
            >
              {/* <GiteOutlinedIcon sx={{ fontSize: 40 }} /> */}
              <NavLink to={routesConfig.login}>
                <MdOutlineWarehouse size={35} color="#ffffff" />
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Message">
            <IconButton
              type="button"
              sx={{ color: "#ffaa33", alignItems: "center" }}
            >
              {/* <MessageOutlinedIcon sx={{ fontSize: 34 }} /> */}
              <NavLink to={"#"}>
                <BsChatDots size={35} color="#ffffff" />
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Shopping">
            <IconButton
              type="button"
              sx={{ color: "#ffaa33", alignItems: "center" }}
            >
              {/* <ShoppingCartOutlinedIcon sx={{ fontSize: 35 }} /> */}
              <NavLink to={"#"}>
                <BsCart size={35} color="#ffffff" />
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <Button>
              <Avatar />
            </Button>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
