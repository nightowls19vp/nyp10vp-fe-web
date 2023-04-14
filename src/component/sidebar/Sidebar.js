import React from "react";
import { useSelector } from "react-redux";
import { List } from "@mui/material";

import SidebarItemCollapse from "./SidebarItemCollapse.js";
import SidebarItem from "./SidebarItem.js";
import { Colors } from "../../config/Colors.js";

function SideBar({ status, data, title }) {
  const dataSidebar = data;
  const selectedStock = useSelector((state) => state.sidebar?.stockID);
  const selectedProfile = useSelector((state) => state.sidebar?.profileID);
  let selectedID = null;
  if (title === "stock") {
    selectedID = selectedStock;
  } else {
    selectedID = selectedProfile;
  }
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
