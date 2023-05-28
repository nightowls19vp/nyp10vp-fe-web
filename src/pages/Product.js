import React from "react";

import SidebarLayout from "../layout/SidebarLayout";
import ProductItem from "../features/Product/ProductItem";
import DefaultLayout from "../layout/DefaultLayout";

function Product() {
  return (
    // <SidebarLayout >
    //     <ProductItem />
    // </SidebarLayout>
    <DefaultLayout>
        <ProductItem />
    </DefaultLayout>
  );
}

export default Product;
