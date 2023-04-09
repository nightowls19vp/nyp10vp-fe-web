import React from "react";
import { List } from "@mui/material";

import dataPackage from "./dataPackage.js";
import SidebarItemCollapse from "./SidebarItemCollapse.js";
import { Colors } from "../../config/Colors.js";

function SideBar({ status }) {
  return (
    <List
      sx={{
        backgroundColor: Colors.search,
        display: { xs: status ? "block" : "none", sm: "block"},
      }}
    >
      {dataPackage.map((packages, index) =>
        packages ? <SidebarItemCollapse item={packages} key={index} /> : null
      )}
    </List>
  );
}

export default SideBar;
