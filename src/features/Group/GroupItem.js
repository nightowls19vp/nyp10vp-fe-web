import React from "react";
import SuperUser from "./SuperUser";
import { useDispatch, useSelector } from "react-redux";

function GroupItem() {
  const groupSU = useSelector((state) => state.user.groupSuperUser);

  return (
    <>
      {/* {groupSU.map((gr) => (gr ? <SuperUser item={gr} key={gr._id} /> : null))} */}
      <SuperUser item={groupSU[0]} />
    </>
  );
}

export default GroupItem;
