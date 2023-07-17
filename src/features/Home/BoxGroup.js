import React from "react";

import { Box, Typography } from "@mui/material";

import * as CustomComponent from "../../component/custom/CustomComponents";

function BoxGroup({ title, img }) {
  return (
    <CustomComponent.ImageButtonBoxGroup
      focusRipple
      style={{
        width: "100%",
      }}
    >
      <CustomComponent.ImageSrcBoxGroup
        style={{ backgroundImage: `url(${img})` }}
      />
      <CustomComponent.ImageBackdropBoxGroup className="MuiImageBackdrop-root" />
      <CustomComponent.ImageBoxGroup>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={{
            position: "relative",
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          {title}
          <CustomComponent.ImageMarkedBoxGroup className="MuiImageMarked-root" />
        </Typography>
      </CustomComponent.ImageBoxGroup>
    </CustomComponent.ImageButtonBoxGroup>
  );
}

export default BoxGroup;
