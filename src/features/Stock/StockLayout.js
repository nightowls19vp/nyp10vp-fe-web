import React from "react";

import StockItem from "./StockItem";
import { useSelector } from "react-redux";

function StockLayout() {
  const listStock = useSelector((state) => state?.stock?.listStock);

  return <StockItem item={listStock} />;
}

export default StockLayout;
