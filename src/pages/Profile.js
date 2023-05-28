import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout";
import dataProfile from "../data/profile.js";

function Profile() {
  const selectedProfile = useSelector((state) => state.package?.profileID);

  return (
    <SidebarLayout
      data={dataProfile}
      title="profile"
      selectedID={selectedProfile}
    >
      {dataProfile.map((route) =>
        route ? (
          route._id === selectedProfile ? (
            <Fragment key={route._id}> {route.action} </Fragment>
          ) : null
        ) : null
      )}
    </SidebarLayout>
  );
}

export default Profile;
