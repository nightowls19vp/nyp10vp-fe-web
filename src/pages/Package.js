import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import SidebarLayout from "../layout/SidebarLayout.js";

import Item from "../component/package/Item.js";
import { getAllPackage } from "../redux/packageRequest.js";

function Package() {
  const dispatch = useDispatch();

  const selectedPackage = useSelector((state) => state.sidebar?.packageID);
  const dataPackage = useSelector((state) => state.sidebar?.package);

  useEffect(() => {
    getAllPackage(dispatch);
  }, [dispatch]);
  
  return (
    <SidebarLayout data={dataPackage} title="package" selectedID={selectedPackage}>
      <Item />
    </SidebarLayout>
  );
}

export default Package;
