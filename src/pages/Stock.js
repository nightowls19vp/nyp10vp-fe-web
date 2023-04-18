import React from "react";
import { useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout.js";

import dataPackage from "../data/dataPackage.js";

function Stock() {
  
  const selectedStock = useSelector((state) => state.sidebar?.stockID);
  
  return (
    <SidebarLayout
      data={dataPackage}
      title="stock"
      selectedID={selectedStock}
    >
      <></>
    </SidebarLayout>
  );
}

export default Stock;
