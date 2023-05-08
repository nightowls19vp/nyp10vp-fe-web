import React from "react";
import { useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout.js";

import dataPackage from "../data/dataPackage.js";
import DetailItem from "../component/package/DetailItem.js";
import { getAllPackage } from "../redux/packageRequest.js";

function Package() {
  getAllPackage();
  const selectedPackage = useSelector((state) => state.sidebar?.packageID);

  return (
    <SidebarLayout data={dataPackage} title="package" selectedID={selectedPackage}>
      <DetailItem />
    </SidebarLayout>
  );
}

export default Package;
