import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Popover,
  Stack,
  InputBase,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Avatar,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import routesConfig from "../../config/routes.js";
import { Colors } from "../../config/Colors.js";
import MenuItem from "./MenuItem.js";
import { dataHeader } from "./dataHeader.js";

const top100Films = [];

function Header() {
  const [path, setPath] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: Colors.background,
        zIndex: 1100,
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <Toolbar>
        <Typography flex={1} sx={{ color: Colors.primary, fontWeight: 600 }}>
          Megoo
        </Typography>
        <Box
          flex={2}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: "15px",
            backgroundColor: Colors.search,
            "&: hover": {
              borderStyle: "solid",
              borderColor: "rgba(22, 24, 35, 0.2)",
            },
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            fullWidth
            renderInput={(params) => (
              <InputBase
                fullWidth
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                sx={{ flex: 1, color: Colors.text }}
                placeholder="Hinted search text"
              />
            )}
          />
          {/* <InputBase
            sx={{ ml: 1, flex: 1, color: Colors.text }}
            placeholder="Hinted search text"
          /> */}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ color: Colors.primary, p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Box
          flex={1}
          justifyContent="end"
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <IconButton aria-describedby={id} type="button" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack
              direction="row"
              justifyContent={"center"}
              alignItems={"center"}
            >
              {dataHeader.map((data, index) => (
                <MenuItem item={data} key={index} path={path} />
              ))}
              <Tooltip title="Account">
                <IconButton>
                  <Avatar sx={{ width: 25, height: 25 }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Popover>
        </Box>
        <Stack
          flex={3}
          sx={{ display: { xs: "none", sm: "flex" } }}
          direction="row"
          justifyContent="end"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
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
                {path === routesConfig.home ? (
                  <MdHome size={35} color={Colors.primary} />
                ) : (
                  <MdOutlineHome size={35} color={Colors.icon} />
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
                {path === "#" ? (
                  <MdPersonAddAlt1 size={35} color={Colors.primary} />
                ) : (
                  <MdPersonAddAlt size={35} color={Colors.icon} />
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
                {path === routesConfig.stock ? (
                  <MdInventory2 size={35} color={Colors.primary} />
                ) : (
                  <MdOutlineInventory2 size={35} color={Colors.icon} />
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
                {path === "#" ? (
                  <MdChat size={35} color={Colors.primary} />
                ) : (
                  <MdOutlineChat size={35} color={Colors.icon} />
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
                {path === "#" ? (
                  <MdShoppingCart size={35} color={Colors.primary} />
                ) : (
                  <MdOutlineShoppingCart size={35} color={Colors.icon} />
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
