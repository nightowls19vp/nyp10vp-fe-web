import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";

import ListMenu from "./ListMenu";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

function SiderBar() {
  return (
    <Box
      bgcolor={"#ffffff"}
      sx={{ height: "calc(100vh - 200px)", width: "20%", paddingTop: 2 }}
    >
      <ListMenu>
        <Menu  title={"CÁC GÓI NGƯỜI DÙNG"}>
          <MenuItem  title={"GÓI 1"} />
          <MenuItem  title={"GÓI 2"} />
        </Menu>
        <Menu title={"CÁC TIỆN ÍCH"}>
          <MenuItem title={"TIỆN ÍCH 1"} />
          <MenuItem title={"TIỆN ÍCH 2"} />
        </Menu>
      </ListMenu>
    </Box>
  );
}

export default SiderBar;
