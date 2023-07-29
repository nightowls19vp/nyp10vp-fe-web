import React, { useState, useEffect, useRef } from "react";
import { Stack, Box, Snackbar, Alert } from "@mui/material";

import HeaderComponent from "../component/header/Header";
import FooterComponent from "../component/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateOpenSnackbar } from "../redux/messageSlice";
import { Colors } from "../config/Colors";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const refFooter = useRef(null);

  const openSnackbar = useSelector((state) => state?.message.flag);
  const statusSnackbar = useSelector((state) => state?.message.status);
  const msgSnackbar = useSelector((state) => state?.message.msg);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(updateOpenSnackbar(false));
  };

  const [heightHeader, setHeightHeader] = useState(0);
  const [heightFooter, setHeightFooter] = useState(0);

  useEffect(() => {
    setHeightHeader(refHeader.current.offsetHeight);
    setHeightFooter(refFooter.current.offsetHeight);
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
          backgroundColor: Colors.bgGray
        }}
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
            sx={{ width: "100%", height: "100px" }}
          >
            {msgSnackbar}
          </Alert>
        </Snackbar>
      </Box>
      <Box ref={refFooter} zIndex={1}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default DefaultLayout;
