import React from "react";
import { List } from "@mui/material";

import dataPackage from "./dataPackage.js";
import SidebarItemCollapse from "./SidebarItemCollapse.js";

function SideBar() {
  return (
    <List sx={{ backgroundColor: "#FFDFB3", width: "20%" }} >
      {dataPackage.map((packages, index) => (
        packages ? <SidebarItemCollapse item={packages} key={index} /> : null
      ))}
    </List>
  );
}

export default SideBar;
