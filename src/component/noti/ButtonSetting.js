import React from "react";
import { Box } from "@mui/material";
import { MdOutlineInventory2 } from "react-icons/md";

import "../../assets/css/Content.scss";
import * as Custom from "../custom/CustomComponents.js";
import { Colors } from "../../config/Colors.js";
import Noti from "./Noti.js";

function ButtonSetting({ title, describe, isChecked, children}) {

  return (
    <>
      <Box flex={1} className="box-noti">
        {children}
      </Box>
      <Box flex={4} className="box-noti">
        <Noti title={title} describe={describe} />
      </Box>
      <Box flex={2}>
        <Custom.IOSSwitch checked={isChecked} />
      </Box>
      </>
  );
}

export default ButtonSetting;
