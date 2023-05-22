import React, { Fragment } from "react";
import SuperUser from "./SuperUser";
import SidebarLayout from "../../layout/SidebarLayout";
import { useSelector } from "react-redux";

function GroupItem() {
  const groups = useSelector((state) => state.user?.groupSuperUser);
  const selectedID = useSelector((state) => state.user?.groupID);
  return (
    <SidebarLayout data={groups} title="group" selectedID={selectedID}>
      {groups[0].child.map((route) =>
        route ? (
          route._id === selectedID ? (
            <SuperUser item={route} key={route._id} />
          ) : null
        ) : null
      )}
    </SidebarLayout>
  );
}

export default GroupItem;
