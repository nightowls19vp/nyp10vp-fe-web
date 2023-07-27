import React from "react";

import { Typography } from "@mui/material";
import Carousel from "better-react-carousel";

import * as CustomComponent from "../../component/custom/CustomComponents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BoxGroup() {
  const navigate = useNavigate();
  const homeGroup = useSelector((state) => state?.home.homeGroup);

  const handleChooseGroup = (e, id) => {
    //navigate(`/group?groupId=${id}&Id=0`);
  };
  return (
    <>
      {homeGroup.length > 0 ? (
        <Carousel cols={3} rows={1} gap={10} loop>
          {homeGroup.map((gr, idx) =>
            gr ? (
              <Carousel.Item key={gr._id}>
                <CustomComponent.ImageButtonBoxGroup
                  focusRipple
                  style={{
                    width: "100%",
                  }}
                  onClick={(e) => handleChooseGroup(e, gr._id)}
                >
                  <CustomComponent.ImageSrcBoxGroup
                    style={{ backgroundImage: `url(${gr?.avatar})` }}
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
                      {gr?.name}
                      <CustomComponent.ImageMarkedBoxGroup className="MuiImageMarked-root" />
                    </Typography>
                  </CustomComponent.ImageBoxGroup>
                </CustomComponent.ImageButtonBoxGroup>
              </Carousel.Item>
            ) : null
          )}
        </Carousel>
      ) : null}
    </>
  );
}

export default BoxGroup;
