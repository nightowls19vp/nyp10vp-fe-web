import React, { Fragment } from "react";
import SuperUser from "./SuperUser";

function GroupItem({ item, title, selected }) {
  return (
    <Fragment>
      {title === "Group SUPER USER" &&
        item.map((route) =>
          route._id === selected ? (
            <SuperUser item={route} key={route._id} />
          ) : null
        )}
    </Fragment>
  );
}

export default GroupItem;
