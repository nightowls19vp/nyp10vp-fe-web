import React from "react";

import DefaultLayout from "../layout/DefaultLayout.js";
import StockItem from "../features/Stock/StockItem.js";

function Stock() {
  return (
    <DefaultLayout >
      <StockItem />
    </DefaultLayout>
  );
}

export default Stock;
