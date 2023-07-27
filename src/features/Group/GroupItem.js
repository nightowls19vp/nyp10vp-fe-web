import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SuperUser from "./SuperUser";
import SidebarLayout from "../../layout/SidebarLayout";
import DefaultLayout from "../../layout/DefaultLayout.js";
import { useDispatch, useSelector } from "react-redux";
import GroupSpending from "./Bill/GroupSpending";
import { loginSuccess } from "../../redux/authSlice";

import { createAxios } from "../../http/createInstance";
import GroupTodos from "./Todos/GroupTodos";
import GroupTasks from "./Tasks/GroupTasks";
import { updateGroupId, updateGroupItemId } from "../../redux/userSlice";

function GroupItem() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  const groups = useSelector((state) => state?.user?.groupAll);
  const selectedID = useSelector((state) => state?.user?.groupID);
  const selectedItemID = useSelector((state) => state?.user?.groupItemID);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // const searchParams = new URLSearchParams(document.location.search);
  // dispatch(updateGroupId(searchParams.get("groupId")));
  // dispatch(updateGroupItemId(parseInt(searchParams.get("Id"))));

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
        <SidebarLayout data={groups} title="group" selectedID={selectedItemID}>
          {groups.map((gr) =>
            gr
              ? gr.child.map((route) =>
                  route ? (
                    route._id === selectedID ? (
                      selectedItemID === 0 ? (
                        <SuperUser
                          item={route.child[0].group}
                          key={route._id}
                          title={gr.name}
                        />
                      ) : selectedItemID === 1 ? (
                        <GroupSpending
                          item={route.child[1].group}
                          key={route._id}
                        />
                      ) : selectedItemID === 2 ? (
                        <GroupTodos
                          key={route._id}
                          grId={route._id}
                          item={route.child[2].group}
                        />
                      ) : (
                        <GroupTasks
                        key={route._id}
                        />
                      )
                    ) : null
                  ) : null
                )
              : null
          )}
        </SidebarLayout>
      )}
    </>
  );
}

export default GroupItem;
