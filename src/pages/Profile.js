import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Stack, Box } from "@mui/material";
// import axios from "axios";
// import jwtDecode from "jwt-decode";

import SidebarLayout from "../layout/SidebarLayout";
import dataProfile from "../data/profile.js";

function Profile() {
  // const refHeader = useRef(null);
  // const refFooter = useRef(null);
  // const user = useSelector((state) => state.auth.login?.currentUser);
  // const decodedToken = jwtDecode(user?.accessToken);
  // let formData = {
  //   username: decodedToken?.user.username,
  // };

  const selectedProfile = useSelector((state) => state.sidebar?.profileID);
  // const selectedItem = useSelector((state) => state.sidebar?.profileItem);

  // const heightHeader = useSelector((state) => state.sidebar?.heightHeader);
  // const heightFooter = useSelector((state) => state.sidebar?.heightFooter);

  return (
    <SidebarLayout
      data={dataProfile}
      title="profile"
      selectedID={selectedProfile}
    >
      {dataProfile.map((route) =>
        route ? (
          route.id === selectedProfile ? (
            <Fragment key={route.id}> {route.action} </Fragment>
          ) : null
        ) : null
      )}
    </SidebarLayout>
  );
}

export default Profile;
