import React from "react";

import StockItem from "./StockItem";
import { useSelector } from "react-redux";
import SidebarLayout from "../../layout/SidebarLayout";

function StockLayout() {
  const listGroupActived = useSelector((state) => state?.stock?.sidebarStock);
  const selectedStock = useSelector((state) => state?.stock?.idStock);

  return (
    <SidebarLayout
      data={listGroupActived}
      title="stock"
      selectedID={selectedStock}
    >
      {listGroupActived?.map((group) =>
        group ? (
          group._id === selectedStock ? (
            <StockItem
              item={group.stocks.data}
              grID={group._id}
              key={group._id}
            />
          ) : null
        ) : null
      )}
    </SidebarLayout>
  );
}

export default StockLayout;
