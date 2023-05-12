import React, { useState, useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";

import HeaderComponent from "../component/header/Header";
import FooterComponent from "../component/footer/Footer";

function DefaultLayout({ children }) {
  const refHeader = useRef(null);
  const refFooter = useRef(null);

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
        }}
      >
        {children}
      </Box>
      <Box ref={refFooter} zIndex={1}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default DefaultLayout;
