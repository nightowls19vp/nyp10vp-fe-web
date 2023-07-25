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
  const boxTranRef = useRef(null);
  const [height, setHeight] = useState(0);
  const homeTodos = useSelector((state) => state?.home.homeTodos);

  useLayoutEffect(() => {
    setHeight(boxTranRef.current.offsetHeight);
  }, []);
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

        <Box
          sx={{ width: "100%" }}
          className="flex-align-start home-box-2-right"
        >
          <Box className="box-box-2-left" flex={1} ref={boxTranRef}>
            <BoxTransaction />
          </Box>
          <Box
            className="box-box-2-right"
            flex={1}
            sx={{ height: `calc(${height}px - 40px)` }}
          >
            <BoxChat />
          </Box>
        </Box>

        {homeTodos.length > 0 ? (
          <BoxTodos className="home-box-3-carousel" />
        ) : null}
      </Stack>

      <Stack sx={{ width: "30%", marginLeft: "5px" }} spacing={2}>
        <Typography
          variant="button"
          display="block"
          sx={{ fontSize: "26px", color: Colors.textPrimary }}
        >
          Thông báo
        </Typography>
        <BoxNotification
          name="Bill tiền sinh nhật"
          date="2023-6-10"
          description="sinh nhat Thanh Ha"
        />
        <BoxNotification
          name="Tiền nước tháng 6"
          date="2023-6-1"
          description=""
        />
        <BoxNotification
          name="Bill - siêu thị"
          date="2023-6-10"
          description="Thanh toán hóa đơn siêu thị"
        />
      </Stack>
    </Box>
  );
}

export default HomeLayout;
