import React from "react";
import SuperUser from "./SuperUser";

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
