import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Colors } from "../../config/Colors";
import {
  updateProfileId,
  updateShowSidebar,
} from "../../redux/packageSlice";
import { updateGroupId } from "../../redux/userSlice";

function SidebarItem({ item, title, selectedID }) {
  const selectedIdx = selectedID;

  const dispacth = useDispatch();

  const handleButtonItemID = (ID) => {
    if (title === "profile") {
      dispacth(updateProfileId(ID));
    } else if (title === "group") {
      dispacth(updateGroupId(ID));
    }
    dispacth(updateShowSidebar(false));
  };

  return (
    <>
      <ListItemButton
        sx={{
          backgroundColor: selectedIdx === item._id ? Colors.primary : null,
          "&: hover": { backgroundColor: Colors.gray },
        }}
        onClick={() => {
          handleButtonItemID(item._id);
        }}
      >
        {item.icon ? (
          <ListItemIcon
            sx={{ color: selectedIdx === item._id ? Colors.background : null }}
          >
            {item.icon && item.icon}
          </ListItemIcon>
        ) : null}
        <ListItemText>
          <Typography
            sx={{
              color: selectedIdx === item._id ? Colors.background : null,
              fontWeight: selectedIdx === item._id ? 800 : null,
              paddingLeft: item.icon ? "10px" : null,
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
