import React, { useState, useEffect, useRef } from "react";
import { Stack, Box, Snackbar, Alert } from "@mui/material";

import HeaderComponent from "../component/header/Header";
import SideBarComponent from "../component/sidebar/Sidebar";
import FooterComponent from "../component/footer/Footer";

import { Colors } from "../config/Colors";
import "../assets/css/Content.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateOpenSnackbar } from "../redux/messageSlice";

function SidebarLayout({ data, title, selectedID, children }) {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const refFooter = useRef(null);
  const refSidebar = useRef(null);

  const [heightHeader, setHeightHeader] = useState(0);
  const [heightFooter, setHeightFooter] = useState(0);
  const [widthContent, setWidthContent] = useState(0);

  const showSidebar = useSelector((state) => state?.package?.showSidebar);
  const openSnackbar = useSelector((state) => state?.message.flag);
  const statusSnackbar = useSelector((state) => state?.message.status);
  const msgSnackbar = useSelector((state) => state?.message.msg);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(updateOpenSnackbar(false));
  };

  useEffect(() => {
    setHeightHeader(refHeader.current.offsetHeight);
    setHeightFooter(refFooter.current.offsetHeight);
    setWidthContent(refSidebar.current.offsetWidth);
  }, []);

  return (
    <Stack>
      <Box ref={refHeader} zIndex={1}>
        <HeaderComponent />
      </Box>

      <Box
        sx={{
          minHeight: `calc(100vh - ${heightHeader}px - ${heightFooter}px)`,
          display: "flex",
          flexDirection: "row",
          justifyContent: { sm: "center", md: "space-between" },
          // justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Box
          bgcolor={Colors.background}
          sx={{
            display: { xs: showSidebar ? "flex" : "none", sm: "flex" },
            //width: { xs: "80%", sm: "300px", lg: "350px"},
            maxWidth: "350px",
            width: "max-content",
          }}
          ref={refSidebar}
        >
          <SideBarComponent data={data} title={title} selectedID={selectedID} />
        </Box>

        <Box
          sx={{
            display: { xs: showSidebar ? "none" : "flex", sm: "flex" },
            width: `calc(100vw - ${widthContent}px - 30px)`,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            paddingX: { xs: "0px", md: "2%", lg: "5%" },
            backgroundColor: Colors.bgGray,
          }}
          paddingY={5}
        >
          {children}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
            onClose={handleCloseSnackbar}
            severity={statusSnackbar ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {msgSnackbar}
          </Alert>
          </Snackbar>
        </Box>
      </Box>

      <Box ref={refFooter} zIndex={1}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default SidebarLayout;
