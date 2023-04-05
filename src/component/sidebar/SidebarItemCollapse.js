import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";

import SidebarItem from "./SidebarItem";

function SidebarItemCollapse({ item }) {
  const [open, setOpen] = useState(item.status);
  return (
    <>
      <ListItemButton
        sx={{
          backgroundColor: "#CC7700",
          color: "#ffffff",
          "&: hover": {
            backgroundColor: "#995900",
          },
        }}
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon sx={{ color: "#ffffff" }}>
          {item.icon && item.icon}
        </ListItemIcon>
        <ListItemText>
          <Typography>{item.title}</Typography>
        </ListItemText>
        {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List sx={{ paddingLeft: 2.5 }}>
          {item.child.map((pack, index) => (
            <SidebarItem item={pack} key={index} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
