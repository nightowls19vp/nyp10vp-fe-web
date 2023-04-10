import React from "react";
import { List } from "@mui/material";

import SidebarItemCollapse from "./SidebarItemCollapse.js";
import SidebarItem from "./SidebarItem.js";
import { Colors } from "../../config/Colors.js";

function SideBar({ status, data }) {
  const dataSidebar = data;

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
            <SidebarItem item={route} key={index} />
          )
        ) : null
      )}
    </List>
  );
}

export default SideBar;
