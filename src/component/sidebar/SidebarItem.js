import React from "react";
import { useDispatch } from "react-redux";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Colors } from "../../config/Colors";
import { updateProfileId, updateStockId } from "../../redux/sidebarSlice";

function SidebarItem({ item, title, selectedID }) {

  const selectedIdx = selectedID;

  const dispacth = useDispatch();

  const handleButtonItemID = (ID) => {
    if (title === "stock") {
      dispacth(updateStockId(ID));
    } else if (title === "profile") {
      let formData = {
        id: ID,
        name: item.action,
      }
      dispacth(updateProfileId(formData));
    }
  }
  
  return (
    <>
      <ListItemButton
        sx={{
          backgroundColor: selectedIdx === item.id ? Colors.primary : null,
          "&: hover": { backgroundColor: Colors.gray },
        }}
        onClick={() => {
          handleButtonItemID(item.id);
        }}
      >
        <ListItemIcon sx={{ color: selectedIdx === item.id ? Colors.background : null }}>
          {item.icon && item.icon}
        </ListItemIcon>
        <ListItemText>
          <Typography
            sx={{
              color: selectedIdx === item.id ? Colors.background : null,
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
