import React from "react";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GroupIcon from "@mui/icons-material/Group";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import "../../assets/css/Home.scss";
import ImgPanda from "../../assets/img/panda.jpg";
import ImgCat from "../../assets/img/meo.jpg";
import * as CustomComponent from "../../component/custom/CustomComponents";
import BoxGroup from "./BoxGroup";
import BoxNotification from "./BoxNotification";
import BoxTodos from "./BoxTodos";
import { Colors } from "../../config/Colors";

function HomeLayout() {
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
        <Box className="home-box-1-left d-flex">
          <IconButton>
            <ArrowBackIosIcon sx={{ fontSize: "40px" }} />
          </IconButton>
          <Box sx={{ width: "40%", paddingY: "10px" }}>
            <BoxGroup title={"Group A"} img={ImgPanda} />
          </Box>
          <Box sx={{ width: "40%", paddingY: "10px" }}>
            <BoxGroup title={"Group B"} img={ImgCat} />
          </Box>
          <IconButton>
            <ArrowForwardIosIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </Box>

        <Box
          sx={{ width: "100%" }}
          className="flex-align-start home-box-2-right"
        >
          <Stack className="box-box-2-left" spacing={1}>
            <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
              Giao dịch gần đây
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 550,
                  color: Colors.textPrimary,
                }}
              >
                Mã giao dịch:
              </Typography>
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "10px", fontSize: "18px" }}
              >
                AGHJ451GT4P
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 550,
                  color: Colors.textPrimary,
                }}
              >
                Tổng tiền:{" "}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "10px", fontSize: "18px" }}
              >
                100.000 vnd
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <QueryBuilderIcon sx={{ color: Colors.textPrimary }} />
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "10px", fontSize: "18px" }}
              >
                2023-5-10
              </Typography>
            </Box>
          </Stack>
          <Stack className="box-box-2-right" spacing={2}>
            <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
              Nhóm chat của tôi
            </Typography>
            <Box className="d-flex">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <GroupIcon />
                <Typography sx={{ paddingX: "10px", fontSize: "18px" }}>
                  Group A
                </Typography>
              </Box>
              <CustomComponent.Button1>Chat</CustomComponent.Button1>
            </Box>
            <Box className="d-flex">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <GroupIcon />
                <Typography sx={{ paddingX: "10px", fontSize: "18px" }}>
                  Nhóm tứ cô nương
                </Typography>
              </Box>
              <CustomComponent.Button1>Chat</CustomComponent.Button1>
            </Box>
            <Box className="d-flex">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <GroupIcon />
                <Typography sx={{ paddingX: "10px", fontSize: "18px" }}>
                  Gia đình là số 1
                </Typography>
              </Box>
              <CustomComponent.Button1>Chat</CustomComponent.Button1>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ width: "100%" }} className="d-flex">
          <BoxTodos
            title={"Đi siêu thị"}
            status1={false}
            name1={"Nước tương"}
            status2={false}
            name2={"Nước mắm"}
            name3={"Nấm"}
          />
          <BoxTodos
            title={"Dọn dẹp nhà"}
            status1={true}
            name1={"Nhà kho 1"}
            status2={false}
            name2={"Nhà bếp"}
            name3={"Sân sau"}
          />
          <BoxTodos
            title={"Học tiếng anh"}
            status1={false}
            name1={"Từ vựng chủ đề Family"}
            status2={true}
            name2={"Luyện nói"}
            name3={"Luyện nghe"}
          />
        </Box>
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
