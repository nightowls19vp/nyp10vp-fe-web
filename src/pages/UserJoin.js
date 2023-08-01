import React from "react";
import { Button, Box, Stack, Typography, Container } from "@mui/material";

import { Colors } from "../config/Colors";
import HomeImg from "../assets/img/Home.png";
import Modal from "../features/UserJoin/Modal";

function UserJoin() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      bgcolor={"#ffeacc"}
      sx={{ height: "100vh", width: "100%", backgroundImage: "HomeImg" }}
    >
      <Modal />
    </Stack>
  );
}

export default UserJoin;
