import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  InputBase,
  Divider,
  IconButton,
  Box,
  Autocomplete,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { AiOutlineBars } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
// import { createAxios } from "../../http/createInstance.js";
import { toggleShowSidebar } from "../../redux/packageSlice";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Header.scss";
import { Colors } from "../../config/Colors.js";
import { dataHeader2 } from "../../data/index.js";
import HeaderAvatar from "./HeaderAvatar.js";

const topSearch = [];

function Header() {
  const dispatch = useDispatch();

  let user = useSelector((state) => state?.auth.login?.currentUser);
  // const userInfo = useSelector((state) => state?.user?.userInfo.user);

  let day = new Date();

  if (user !== null) {
    const decodedToken = jwtDecode(user?.accessToken);
    if (decodedToken.exp < day.getTime() / 1000) {
      dispatch(loginSuccess(null));
    }
  }

  const handleHeaderBars = () => {
    dispatch(toggleShowSidebar());
  };

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
                sx={{ flex: 1, color: Colors.text, paddingLeft: "10px" }}
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
        <Stack
          flex={3}
          sx={{ display: { xs: "none", sm: "flex" } }}
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
          className="nav-bar"
        >
          <HeaderAvatar data={dataHeader2} user={user} />
        </Stack>
      </Toolbar>
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }}>
        <Stack
          flex={1}
          sx={{ display: { xs: "flex", sm: "none" } }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
        >
          <HeaderAvatar data={dataHeader2} user={user} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
