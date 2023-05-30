import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import SuperUser from "./SuperUser";
import SidebarLayout from "../../layout/SidebarLayout";
import DefaultLayout from "../../layout/DefaultLayout.js";
import { useSelector } from "react-redux";

function GroupItem() {
  const groups = useSelector((state) => state?.user?.groupAll);
  const selectedID = useSelector((state) => state?.user?.groupID);
  return (
    <>
      {selectedID === 0 ? (
        <DefaultLayout>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Typography> Hiện bạn chưa có nhóm nào </Typography>
          </Box>
        </DefaultLayout>
      ) : (
        <SidebarLayout data={groups} title="group" selectedID={selectedID}>
          {groups[0].child.map((route) =>
            route ? (
              route._id === selectedID ? (
                <SuperUser item={route} key={route._id} />
              ) : null
            ) : null
          )}
        </SidebarLayout>
      )}
    </>
  );
}

export default GroupItem;
