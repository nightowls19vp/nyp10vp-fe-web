import React from "react";
import { useSelector } from "react-redux";
import { List, Box } from "@mui/material";

import SidebarItemCollapse from "./SidebarItemCollapse.js";
import SidebarItem from "./SidebarItem.js";
import { Colors } from "../../config/Colors.js";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

function SideBar({ status, data, title, selectedID }) {
  const dataSidebar = data;
  const heightHeader = useSelector((state) => state.sidebar?.heightHeader);
  const heightFooter = useSelector((state) => state.sidebar?.heightFooter);
  // const selectedStock = useSelector((state) => state.sidebar?.stockID);
  // const selectedProfile = useSelector((state) => state.sidebar?.profileID);
  // let selectedID = null;
  // if (title === "stock") {
  //   selectedID = selectedStock;
  // } else {
  //   selectedID = selectedProfile;
  // }
  return (
    <List
      sx={{
        minHeight: `calc(100vh - ${heightHeader}px - ${heightFooter}px + 50px)`,
        backgroundColor: Colors.search,
        display: { xs: status ? "block" : "none", sm: "block" },
      }}
      className="scroll-sidebar-class"
    >
      {dataSidebar.map((route, index) =>
        route ? (
          route.child ? (
            <SidebarItemCollapse
              item={route}
              key={index}
              title={title}
              selectedID={selectedID}
            />
          ) : (
            <SidebarItem
              item={route}
              key={index}
              title={title}
              selectedID={selectedID}
            />
          )
        ) : null
      )}
    </List>
  );
}

export default SideBar;
