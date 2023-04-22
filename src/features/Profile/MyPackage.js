import React from "react";
import { Stack, Typography, Box } from "@mui/material";

import { Colors } from "../../config/Colors";

function MyPackage() {
  return (
    <Box>
      <Stack>
        <Typography
          variant="button"
          display="block"
          color={Colors.textPrimary}
          gutterBottom
        >
          Gói đang sử dụng
        </Typography>
        
      </Stack>
    </Box>
  );
}

export default MyPackage;
