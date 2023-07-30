import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

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

  const [widthContent, setWidthContent] = useState(window.innerWidth);
  
  useEffect(() => {
    function handleWindowResize() {
      setWidthContent(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: widthContent < 978 ? "column" : "row" }}
      className="home-box"
    >
      <Stack sx={{ width: widthContent < 978 ? "100%" : "70%", m: 1 }} spacing={3}>
        <BoxGroup />

        <BoxTransaction className="home-box-3-trans" />

        {homeTodos.length > 0 ? (
          <BoxTodos className="home-box-3-todos" homeTodos={homeTodos} />
        ) : null}
      </Stack>

      <Stack sx={{ width: widthContent < 978 ? "100%" : "30%", m: 1 }} spacing={2}>
        {homeBilling.length > 0 &&
          homeBilling.map((bill, idx) =>
            bill && idx < 5 ? <BoxNotification bill={bill} homeBilling={homeBilling} key={idx} /> : null
          )}
      </Stack>
    </Box>
  );
}

export default HomeLayout;
