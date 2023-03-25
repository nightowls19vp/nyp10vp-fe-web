import React from "react";

import { Box, Typography } from "@mui/material";

function LeftContent() {
  return (
    <Box
      flex={2}
      sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        variant="h2"
        component="h2"
        p={2}
      >
        Trang web quản lý nhu yếu phẩm
      </Typography>
    </Box>
  );
}

export default LeftContent;
