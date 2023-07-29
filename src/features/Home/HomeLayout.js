import React, { useLayoutEffect, useRef, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import "../../assets/css/Home.scss";
import BoxGroup from "./BoxGroup";
import BoxNotification from "./BoxNotification";
import BoxTodos from "./BoxTodos";
import { Colors } from "../../config/Colors";
import BoxChat from "./BoxChat";
import BoxTransaction from "./BoxTransaction";
import { useSelector } from "react-redux";

function HomeLayout() {
  const homeTodos = useSelector((state) => state?.home.homeTodos);
  const homeBilling = useSelector((state) => state?.home.homeBilling);
  const homeChat = useSelector((state) => state?.home.homeChat);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginX: "5%",
        marginY: "2%",
        backgroundColor: Colors.bgGray,
        paddingX: "3em",
        paddingY: "1em",
        borderRadius: "10px",
      }}
    >
      <Stack sx={{ width: "70%", marginRight: "5px" }} spacing={3}>
        <BoxGroup />

        <BoxTransaction className="home-box-3-trans" />

        {homeTodos.length > 0 ? (
          <BoxTodos className="home-box-3-todos" homeTodos={homeTodos} />
        ) : null}
      </Stack>

      <Stack sx={{ width: "30%", marginLeft: "5px" }} spacing={2}>
        {/* <Typography
          variant="button"
          display="block"
          sx={{ fontSize: "26px", color: Colors.textPrimary }}
        >
          Thông báo
        </Typography> */}
        {homeBilling.length > 0 &&
          homeBilling.map((bill, idx) =>
            bill ? <BoxNotification bill={bill} key={idx} /> : null
          )}
      </Stack>
    </Box>
  );
}

export default HomeLayout;
