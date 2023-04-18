import React from "react";
import { List } from "@mui/material";

import SidebarItemCollapse from "./SidebarItemCollapse.js";
import SidebarItem from "./SidebarItem.js";

function SideBar({ status, data, title, selectedID }) {
  const dataSidebar = data;

  return (
    <List
      sx={{
        // display: { xs: status ? "block" : "none", sm: "block" },
      }}
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
