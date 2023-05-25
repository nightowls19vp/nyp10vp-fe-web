import React, { Fragment } from "react";
import { Typography } from "@mui/material";
import SuperUser from "./SuperUser";
import SidebarLayout from "../../layout/SidebarLayout";
import DefaultLayout from "../../layout/DefaultLayout.js";
import { useSelector } from "react-redux";

function GroupItem() {
  const groups = useSelector((state) => state.user?.groupSuperUser);
  const selectedID = useSelector((state) => state.user?.groupID);
  return (
    <>
      {groups[0].child === [] && groups[1].child === [] ? (
        <DefaultLayout>
          <Typography variant="h5" gutterBottom>
            Bạn chưa tham gia nhóm nào!
          </Typography>
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
