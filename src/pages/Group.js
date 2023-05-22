import React, { useEffect } from "react";

import SidebarLayout from "../layout/SidebarLayout";
import { dataGroup } from "../data/group";
import GroupItem from "../features/Group/GroupItem";
import { getGroupByUserId } from "../redux/userRequest";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../http/createInstance";

function Group() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    getGroupByUserId(user?.accessToken, "Super User", dispatch, axiosJWT);
  }, [axiosJWT, dispatch, user]);
  
  return (
    <GroupItem />
  );
}

export default Group;
