import React from "react";
import { useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout.js";

import Item from "../component/package/Item.js";

function Package() {
  const selectedPackage = useSelector((state) => state.sidebar?.packageID);
  const dataPackage = useSelector((state) => state.sidebar?.package)

  return (
    <SidebarLayout data={dataPackage} title="package" selectedID={selectedPackage}>
      <Item />
    </SidebarLayout>
  );
}

export default Package;
