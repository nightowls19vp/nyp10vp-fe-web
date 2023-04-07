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
import { Colors } from "../../config/Colors";

function SidebarItemCollapse({ item }) {
  const [open, setOpen] = useState(item.status);
  return (
    <>
      <ListItemButton
        sx={{
          // backgroundColor: "#CC7700",
          "&: hover": {
            backgroundColor: Colors.gray,
          },
        }}
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon
          sx={{
            color: open ? Colors.textPrimary : Colors.text,
            fontWeight: open ? 600 : null,
          }}
        >
          {item.icon && item.icon}
        </ListItemIcon>
        <ListItemText>
          <Typography
            sx={{
              color: open ? Colors.textPrimary : Colors.text,
              fontWeight: open ? 600 : null,
            }}
          >
            {item.title}
          </Typography>
        </ListItemText>
        {open ? <ExpandLessOutlined sx={{ color: Colors.textPrimary }} /> : <ExpandMoreOutlined />}
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
