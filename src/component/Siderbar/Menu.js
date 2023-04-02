import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

function Menu({ icon, title, children }) {
  return (
    <Stack spacing={2} >
      <Grid display={"flex"} >
        {icon}
        <Typography paddingLeft={2}> {title} </Typography>
      </Grid>
      {children}
    </Stack>
  );
}

export default Menu;
