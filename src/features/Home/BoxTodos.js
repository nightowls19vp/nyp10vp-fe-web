import React from "react";

import { Box, Checkbox, Stack, Typography } from "@mui/material";
import "../../assets/css/Home.scss";

function BoxTodos({ title, status1, name1, status2, name2, name3 }) {
  return (
    <Stack spacing={1} sx={{ width: "28%" }} className="home-box-3-left">
      <Typography sx={{ fontSize: "30px", fontWeight: 550}}>{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Checkbox checked={status1} />
        <Typography>{name1}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Checkbox checked={status1} />
        <Typography>{name2}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Checkbox checked={status2} />
        <Typography>{name3}</Typography>
      </Box>
    </Stack>
  );
}

export default BoxTodos;
