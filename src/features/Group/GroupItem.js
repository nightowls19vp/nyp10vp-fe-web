import React from "react";
import SuperUser from "./SuperUser";
import { useDispatch, useSelector } from "react-redux";

import { dataGroup } from "../../data/group";

function GroupItem({ item, title, selected }) {
  return (
    <div>
      {title === "Group SUPER USER" &&
        item.map((route) =>
          route._id === selected ? (
            <SuperUser item={route} key={route._id} />
          ) : null
        )}
    </div>
  );
}

export default GroupItem;
