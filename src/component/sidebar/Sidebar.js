import React from "react";
import { List, Drawer, DrawerHeader, Divider, IconButton } from "@mui/material";

import dataPackage from "./dataPackage.js";
import SidebarItemCollapse from "./SidebarItemCollapse.js";
import { Colors } from "../../config/Colors.js";

function SideBar() {
  return (
    <List sx={{ backgroundColor: Colors.search }} > 
      {dataPackage.map((packages, index) =>
        packages ? <SidebarItemCollapse item={packages} key={index} /> : null
      )}
    </List>
  );
}

export default SideBar;
