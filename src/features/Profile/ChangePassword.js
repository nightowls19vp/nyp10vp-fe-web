import React, { useState, useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";

import PasswordComponent from "../../component/password/Password";

import * as Custom from "../../component/custom/CustomComponents.js";

function ChangePassword() {
  const refContainer = useRef();

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [rePasswordNew, setRePasswordNew] = useState("");

  const onChangeValue = (newValue, id) => {
    if (id === 1) {
      setPasswordCurrent(newValue);
    } else if (id === 2) {
      setPasswordNew(newValue);
    } else {
      setRePasswordNew(newValue);
    }
  };

  const handleChangePassword = () => {
    //
  };

  return (
    <Stack spacing={2.5} className="box-change-password" sx={{ width: "70%"}}>
      <PasswordComponent
        title="Mật khẩu hiện tại"
        id={1}
        onChangeValue={onChangeValue}
      />
      <PasswordComponent
        title="Mật khẩu mới"
        id={2}
        onChangeValue={onChangeValue}
      />
      <PasswordComponent
          title="Nhập lại mật khẩu mới"
          id={3}
          onChangeValue={onChangeValue}
        />
    </Stack>
  );
}

export default ChangePassword;
