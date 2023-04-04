import React from "react";
import { Grid, Typography, Button } from "@mui/material";

function MenuItem({ title }) {
  return (
    <Button
      type="button"
      sx={{ color: "#000000", alignItems: "center" }}
      fullWidth
    >
      <Typography> {title} </Typography>
    </Button>
  );
}

export default MenuItem;
