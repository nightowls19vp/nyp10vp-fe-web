import React from "react";
import { Grid, Typography } from "@mui/material";

function MenuItem({ icon, title }) {
  return (
    <Grid display={"flex"} pl={2} >
      {icon}
      <Typography paddingLeft={2}> {title} </Typography>
    </Grid>
  );
}

export default MenuItem;
