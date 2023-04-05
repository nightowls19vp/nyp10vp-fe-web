import React, { useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

function SidebarItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ListItemButton
        sx={{
          "&: hover": { backgroundColor: "#ffd599" },
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ListItemIcon sx={{ color: isOpen ? "#e60000" : null }}>
          {item.icon && item.icon}
        </ListItemIcon>
        <ListItemText>
          <Typography
            sx={{ color: isOpen ? "#e60000" : null, fontWeight: isOpen ? 800 : null }}
          >
            {item.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </>
  );
}

export default SidebarItem;
