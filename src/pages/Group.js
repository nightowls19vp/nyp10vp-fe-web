import React, { useEffect } from "react";

import SidebarLayout from "../layout/SidebarLayout";
import { dataGroup } from "../data/group";
import SuperUser from "../features/Group/SuperUser";

function Group() {
  return (
    <SidebarLayout data={dataGroup} title="profile" selectedID={1}>
      <SuperUser  />
    </SidebarLayout>
  );
}

export default Group;
