import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import SuperUser from "./SuperUser";
import SidebarLayout from "../../layout/SidebarLayout";
import DefaultLayout from "../../layout/DefaultLayout.js";
import { useSelector } from "react-redux";
import GroupSpending from "./GroupSpending";

function GroupItem() {
  const groups = useSelector((state) => state?.user?.groupAll);
  const selectedID = useSelector((state) => state?.user?.groupID);
  const selectedItemID = useSelector((state) => state?.user?.groupItemID);
  return (
    <>
      {selectedID === 0 ? (
        <DefaultLayout>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={22}> Hiện bạn chưa có nhóm nào </Typography>
          </Box>
        </DefaultLayout>
      ) : (
        <SidebarLayout
          data={groups}
          title="group"
          selectedID={selectedItemID}
        >
          {groups[0].child.map((route) =>
            route ? (
              route._id === selectedID ? (
                selectedItemID === 0 ? (
                  <SuperUser item={route.child[0].group} key={route._id} />
                ) : (
                  <GroupSpending item={route.child[1].group} key={route._id} />
                )
              ) : null
            ) : null
          )}
        </SidebarLayout>
      )}
    </>
  );
}

export default GroupItem;
