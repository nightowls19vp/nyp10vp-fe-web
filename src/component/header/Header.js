import React, { useEffect, useState } from "react";
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

import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  MdHome,
  MdOutlineHome,
  MdInventory2,
  MdOutlineInventory2,
  MdPersonAddAlt1,
  MdPersonAddAlt,
  MdChat,
  MdOutlineChat,
  MdShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";

import routesConfig from "../../config/routes.js";

function Header() {
  // console.log(window.location.pathname);
  const [iconHome, setIconHome] = useState(false);
  const [iconPackage, setIconPackage] = useState(false);
  const [iconStock, setIconStock] = useState(false);
  const [iconChat, setIconChat] = useState(false);
  const [iconShopping, setIconShopping] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIconHome(true);
    } else if (window.location.pathname === "/stock") {
      setIconStock(true);
    }
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#F58F00" }}>
      <Toolbar>
        <Typography flex={2} color={"#ffffff"}>
          Megoo
        </Typography>
        <Box
          sx={{
            p: "2px 4px",
            display: "flex",
            flex: 2,
            alignItems: "center",
            borderRadius: "15px",
            backgroundColor: "#F0F2F5",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#bfbfbf" }}
            placeholder="Hinted search text"
            inputProps={{ "aria-label": "Hinted search text" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ color: "#F58F00", p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Stack
          flex={3}
          direction="row"
          justifyContent="end"
          spacing={2}
          alignItems="center"
        >
          <Tooltip title="Home">
            <IconButton
              type="button"
              sx={{
                alignItems: "center",
              }}
            >
              <NavLink to={routesConfig.home}>
                {iconHome ? (
                  <MdHome size={35} color="#ffffff" />
                ) : (
                  <MdOutlineHome size={35} color="#ffffff" />
                )}
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Package">
            <IconButton
              type="button"
              sx={{
                alignItems: "center",
              }}
            >
              <NavLink to="#">
                {iconPackage ? (
                  <MdPersonAddAlt1 size={35} color="#ffffff" />
                ) : (
                  <MdPersonAddAlt size={35} color="#ffffff" />
                )}
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Stock">
            <IconButton
              type="button"
              sx={{
                alignItems: "center",
              }}
            >
              <NavLink to={routesConfig.stock}>
                {iconStock ? (
                  <MdInventory2 size={35} color="#ffffff" />
                ) : (
                  <MdOutlineInventory2 size={35} color="#ffffff" />
                )}
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Message">
            <IconButton
              type="button"
              sx={{
                alignItems: "center",
              }}
            >
              <NavLink to={"#"}>
                {iconChat ? (
                  <MdChat size={35} color="#ffffff" />
                ) : (
                  <MdOutlineChat size={35} color="#ffffff" />
                )}
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Shopping">
            <IconButton
              type="button"
              sx={{
                alignItems: "center",
              }}
            >
              <NavLink to={"#"}>
                {iconShopping ? (
                  <MdShoppingCart size={35} color="#ffffff" />
                ) : (
                  <MdOutlineShoppingCart size={35} color="#ffffff" />
                )}
              </NavLink>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <Button>
              <Avatar sizes="35" />
            </Button>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
