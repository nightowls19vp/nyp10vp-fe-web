import React, { useEffect } from "react";

import DefaultLayout from "../layout/DefaultLayout";
import ShoppingParent from "../features/Shopping/ShoppingParent";

// import SockectIO from "../http/socket.js";

function ShoppingCart() {
  // const socket = SockectIO();
  // useEffect(() => {
  //   socket.connect();

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);
  return (
    <DefaultLayout>
      <ShoppingParent />
    </DefaultLayout>
  );
}

export default ShoppingCart;
