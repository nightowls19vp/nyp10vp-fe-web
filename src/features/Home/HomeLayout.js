import React, { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";

import "../../assets/css/Home.scss";
import BoxGroup from "./BoxGroup";
import BoxNotification from "./BoxNotification";
import BoxTodos from "./BoxTodos";
// import { Colors } from "../../config/Colors";
// import BoxChat from "./BoxChat";
import BoxTransaction from "./BoxTransaction";
import { useSelector } from "react-redux";
import HomeImg from "../../assets/img/Home.png";

function HomeLayout() {
  const homeTodos = useSelector((state) => state?.home.homeTodos);
  const homeBilling = useSelector((state) => state?.home.homeBilling);
  const homeChat = useSelector((state) => state?.home.homeChat);
  const homeGroup = useSelector((state) => state?.home.homeGroup);

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
    <>
      {homeGroup.length > 0 ? (
        <Box className="home-box">
          <Stack
            sx={{
              width: homeBilling.length <= 0 ? "100%" : "70%",
              m: 1,
              display:
                widthContent < 600 && homeBilling.length > 0 ? "none" : "block",
            }}
            spacing={3}
          >
            <BoxGroup />

            <BoxTransaction className="home-box-3-trans" homeChat={homeChat} />

            {homeTodos.length > 0 ? (
              <BoxTodos
                className="home-box-3-todos"
                homeTodos={homeTodos}
                widthContent={widthContent}
              />
            ) : null}
          </Stack>

          <Stack
            sx={{
              width: widthContent < 600 ? "100%" : "30%",
              display: homeBilling.length > 0 ? "block" : "none",
              m: 1,
            }}
            spacing={2}
          >
            {homeBilling.length > 0 &&
              homeBilling.map((bill, idx) =>
                bill && idx < 5 ? (
                  <BoxNotification
                    bill={bill}
                    homeBilling={homeBilling}
                    key={idx}
                  />
                ) : null
              )}
          </Stack>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <img src={HomeImg} alt="Logo" width={"100%"} />
        </Box>
      )}
    </>
  );
}

export default HomeLayout;
