import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout.js";

import Item from "../component/package/Item.js";
import { getAllPackage } from "../redux/packageRequest.js";
import DefaultLayout from "../layout/DefaultLayout.js";
import PackageItem from "../features/Package/PackageItem.js";
import { Typography } from "@mui/material";

function Package() {
  const dispatch = useDispatch();

  const selectedPackage = useSelector((state) => state.sidebar?.packageID);
  const dataPackage = useSelector((state) => state.sidebar?.package);

  useEffect(() => {
    getAllPackage(dispatch);
  }, [dispatch]);

  return (
    // <SidebarLayout data={dataPackage} title="package" selectedID={selectedPackage}>
    //   <Item />
    // </SidebarLayout>
    <DefaultLayout>
      <PackageItem data={dataPackage[0]} title="package" selectedID={selectedPackage} />
    </DefaultLayout>
  );
}

export default Package;
