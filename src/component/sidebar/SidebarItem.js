import React, { useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Colors } from "../../config/Colors";

function SidebarItem({ item }) {
  const [selectedIdx, setSelectedIdx] = useState(1);
  return (
    <>
      <ListItemButton
        sx={{
          "&: hover": { backgroundColor: Colors.gray },
        }}
        onClick={() => setSelectedIdx(item.id)}
      >
        <ListItemIcon sx={{ color: selectedIdx === item.id ? Colors.itemSidebar : null }}>
          {item.icon && item.icon}
        </ListItemIcon>
        <ListItemText>
          <Typography
            sx={{
              color: selectedIdx === item.id ? Colors.itemSidebar : null,
              fontWeight: selectedIdx === item.id ? 800 : null,
            }}
          >
            {item.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </>
  );
}

export default SidebarItem;
