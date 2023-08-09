import React from "react";
import { Stack} from "@mui/material";


import HomeImg from "../assets/img/Home.png";
import Modal from "../features/UserJoin/Modal";

function UserJoin() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      bgcolor={"#ffeacc"}
      sx={{ height: "100vh", width: "100%", backgroundImage: `url(${HomeImg})` }}
    >
      <Modal />
    </Stack>
  );
}

export default UserJoin;
