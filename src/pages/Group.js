import React, { useEffect } from "react";

import SidebarLayout from "../layout/SidebarLayout";
import { dataGroup } from "../data/group";
import GroupItem from "../features/Group/GroupItem";
import { getGroupByUserId } from "../redux/userRequest";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../http/createInstance";
import { setGroups, updateGroupId } from "../redux/packageSlice";

function Group() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const groups = useSelector((state) => state.sidebar.groups);
  const selectedID = useSelector((state) => state.sidebar.groupID);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // useEffect(() => {
  //   getGroupByUserId(user?.accessToken, "Super User", dispatch, axiosJWT);
  // }, [axiosJWT, dispatch, user]);

  useEffect(() => {
    dispatch(setGroups(dataGroup));
    for (let el of dataGroup) {
      if (el.child.length > 0) {
        dispatch(updateGroupId(el.child[0]._id));
        return;
      }
    }
  }, [dispatch]);
  
  return (
    <SidebarLayout data={groups} title="group" selectedID={selectedID}>
      <GroupItem />
      {groups.map((route, indx) =>
        route ? (
          <GroupItem item={route.child} title={route.title} selected={selectedID} key={indx} />
        ) : null
      )}
    </SidebarLayout>
  );
}

export default Group;
