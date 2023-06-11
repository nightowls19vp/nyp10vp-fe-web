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
import { useDispatch } from "react-redux";
import { updateGroupId } from "../../redux/userSlice";

function SidebarItemCollapse({ item, title, selectedID }) {

  const dispacth = useDispatch();
  const [open, setOpen] = useState(item.status);

  const handleButtonStatus = () => {
    if (title === "group") {
      dispacth(updateGroupId(item._id));
      setOpen(!open);
    }
  }
  
  return (
    <>
      <ListItemButton
        sx={{
          "&: hover": {
            backgroundColor: Colors.gray,
          },
        }}
        disabled={item.child?.length > 0 ? false : true}
        onClick={handleButtonStatus}
      >
        <ListItemText>
          <Typography
            sx={{
              color: open ? Colors.textPrimary : Colors.text,
              fontWeight: open ? 600 : null,
            }}
          >
            {item.name}
          </Typography>
        </ListItemText>
        {open ? (
          <ExpandLessOutlined sx={{ color: Colors.textPrimary }} />
        ) : (
          <ExpandMoreOutlined />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List sx={{ paddingX: 2.5 }}>
          {item.child?.map((route, index) =>
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
          )}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
