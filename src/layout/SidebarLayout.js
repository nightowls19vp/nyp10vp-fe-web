import React, { useState, useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";

import HeaderComponent from "../component/header/Header";
import SideBarComponent from "../component/sidebar/Sidebar";
import FooterComponent from "../component/footer/Footer";

import { Colors } from "../config/Colors";
import "../assets/css/Content.scss";
import { useSelector } from "react-redux";

function SidebarLayout({ data, title, selectedID, children }) {
  const refHeader = useRef(null);
  const refFooter = useRef(null);
  const refSidebar = useRef(null);

  const [heightHeader, setHeightHeader] = useState(0);
  const [heightFooter, setHeightFooter] = useState(0);
  const [widthContent, setWidthContent] = useState(0);

  const showSidebar = useSelector((state) => state?.package?.showSidebar);

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
          // justifyContent: { sm: "center", md: "space-between" },
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Box
          bgcolor={Colors.search}
          sx={{
            display: { xs: showSidebar ? "flex" : "none", sm: "flex" },
            maxWidth: '300px',
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
            paddingX: { sx: 0, sm: "15px"},
          }}
          paddingY={5}
        >
          {children}
        </Box>
        
      </Box>

      <Box ref={refFooter} zIndex={1}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default SidebarLayout;
