import React, { useState, useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";

import PasswordComponent from "../../component/password/Password";

import * as Custom from "../../component/custom/CustomComponents.js";

function ChangePassword() {
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
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        spacing={2.5}
        className="box-change-password"
        sx={{ width: { xs: "90%", sm: "70%", lg: "50%" } }}
      >
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
        <Box>
          <Custom.Button1
            disabled={!(passwordCurrent && passwordNew && rePasswordNew)}
            onClick={handleChangePassword}
          >
            Lưu thay đổi
          </Custom.Button1>
        </Box>
      </Stack>
    </Box>
  );
}

export default ChangePassword;
