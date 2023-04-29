import React from "react";
import { useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout.js";

import dataPackage from "../data/dataPackage.js";
import DetailItem from "../component/package/DetailItem.js";

function Package() {
  const selectedStock = useSelector((state) => state.sidebar?.stockID);

  return (
    <SidebarLayout data={dataPackage} title="stock" selectedID={selectedStock}>
      <DetailItem />
    </SidebarLayout>
  );
}

export default Package;
