import React from "react";

import ProductItem from "../features/Product/ProductItem";
import DefaultLayout from "../layout/DefaultLayout";

function ListProduct() {
  // const urlQuery = new URL(window.location.href).searchParams;
  // console.log(urlQuery.get("id"));
  return (
    <DefaultLayout>
        <ProductItem />
    </DefaultLayout>
  );
}

export default ListProduct;
