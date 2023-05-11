import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { createAxios } from "../../http/createInstance.js";

import "../../assets/css/Header.scss";
import { Colors } from "../../config/Colors.js";
import routesConfig from "../../config/routes.js";
import { dataHeader1, dataHeader2 } from "../../data/index.js";
import MenuItem from "./MenuItem.js";
import MenuItemRow from "./MenuItemRow.js";
import { toggleShowSidebar, updatePackageId, updateProfileId } from "../../redux/packageSlice";
import { getAllPackage, getUserCart } from "../../redux/packageRequest";
import { loginSuccess } from "../../redux/authSlice";

const topSearch = [];

function Header() {
  const dispatch = useDispatch();

  const [path, setPath] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  let user = useSelector((state) => state.auth.login?.currentUser);
  let day = new Date();
  const decodedToken = jwtDecode(user?.accessToken);
  if (decodedToken.exp < (day.getTime())/1000) {
    user = null;
  }

  // const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleHeaderBars = () => {
    dispatch(toggleShowSidebar());
  };

  useEffect(() => {
    setPath(window.location.pathname);
    // getAllPackage(dispatch);
    // getShoppingCart().then((cart) => {
    //   setShopping(cart);
    // });
    // return function cleanup() {
    //   getShoppingCart();
    // }
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: Colors.background,
      }}
      className="header"
    >
      <Toolbar>
        <Stack flex={{ xs: 2, sm: 1 }} className="app-bar">
          <Box display={{ xs: "block", sm: "none" }}>
            <IconButton onClick={handleHeaderBars}>
              <AiOutlineBars />
            </IconButton>
          </Box>
          <Typography sx={{ color: Colors.primary, fontWeight: 600 }}>
            Megoo
          </Typography>
        </Stack>
        <Box
          flex={{ xs: 3, sm: 2 }}
          sx={{
            backgroundColor: Colors.search,
          }}
          className="search-bar"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={topSearch}
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
            <Stack direction="column">
              {dataHeader1.map((data, index) => (
                <MenuItem item={data} key={index} path={path} user={user} />
              ))}
              <Tooltip title="Account">
                <IconButton >
                  <NavLink to={user ? routesConfig.profile : routesConfig.login} className="avatar">
                    <Avatar
                      sx={{ width: "27px", height: "27px" }}
                      className="avatarActive"
                    />
                  </NavLink>
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
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
          className="nav-bar"
        >
          {dataHeader2.map((data, index) => (
            <MenuItemRow item={data} key={index} path={path} user={user} />
          ))}
          <Tooltip title="Account">
            <Button >
              <NavLink to={user ? routesConfig.profile : routesConfig.login} className="avatar">
                <Avatar sizes="35" className="avatarActive" />
              </NavLink>
            </Button>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
