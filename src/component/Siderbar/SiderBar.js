import React from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import ListMenu from "./ListMenu";

function SiderBar() {
  return (
    <Box bgcolor={"#ebebe0"} sx={{ width: "20%", paddingTop: 2, paddingBottom: 2 }} >
      <ListMenu >
        <Menu icon={<HomeIcon />} title={"Cac goi ng dung"} >
            <MenuItem icon={<HomeIcon />} title={"Home page"}/>
            <MenuItem icon={<HomeIcon />} title={"Menu page"}/>
        </Menu>
      </ListMenu>
    </Box>
  );
}

export default SiderBar;
