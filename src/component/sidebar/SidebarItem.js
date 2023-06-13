import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Colors } from "../../config/Colors";
import { updateProfileId, updateShowSidebar } from "../../redux/packageSlice";
import { updateGroupId, updateGroupItemId } from "../../redux/userSlice";

function SidebarItem({ item, title, selectedID }) {
  const selectedIdx = selectedID;

  const dispacth = useDispatch();

  const grID = useSelector((state) => state?.user?.groupID);

  const handleButtonItemID = (ID) => {
    if (title === "profile") {
      dispacth(updateProfileId(ID));
    } else if (title === "group") {
      dispacth(updateGroupItemId(ID));
    }
    dispacth(updateShowSidebar(false));
  };

  return (
    <>
      <ListItemButton
        sx={{
          backgroundColor: (
            title === "group"
              ? selectedIdx === item._id && grID === item.group._id
              : selectedIdx === item._id
          )
            ? Colors.primary
            : null,
          "&: hover": { backgroundColor: Colors.gray },
        }}
        onClick={() => {
          handleButtonItemID(item._id);
        }}
      >
        {item.icon ? (
          <ListItemIcon
            sx={{
              color: (
                title === "group"
                  ? selectedIdx === item._id && grID === item.group._id
                  : selectedIdx === item._id
              )
                ? Colors.background
                : null,
            }}
          >
            {item.icon && item.icon}
          </ListItemIcon>
        ) : null}
        <ListItemText>
          <Typography
            sx={{
              color: (
                title === "group"
                  ? selectedIdx === item._id && grID === item.group._id
                  : selectedIdx === item._id
              )
                ? Colors.background
                : null,
              fontWeight: (
                title === "group"
                  ? selectedIdx === item._id && grID === item.group._id
                  : selectedIdx === item._id
              )
                ? 800
                : null,
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
