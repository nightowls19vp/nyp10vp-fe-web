import React from "react";
import { List } from "@mui/material";

import dataPackage from "./dataPackage.js";
import SidebarItemCollapse from "./SidebarItemCollapse.js";
import SidebarItem from "./SidebarItem.js";
import { Colors } from "../../config/Colors.js";

function SideBar({ status }) {
  const dataSidebar = dataPackage;

  return (
    <List
      sx={{
        backgroundColor: Colors.search,
        display: { xs: status ? "block" : "none", sm: "block" },
      }}
    >
      {dataSidebar.map((route, index) =>
        route ? (
          route.child ? (
            <SidebarItemCollapse item={route} key={index} />
          ) : (
            <SidebarItem item={route} />
          )
        ) : null
      )}
    </List>
  );
}

export default SideBar;
