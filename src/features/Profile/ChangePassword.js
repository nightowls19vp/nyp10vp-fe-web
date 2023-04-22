import React, { useState, useEffect, useRef } from "react";
import { Stack, Box } from "@mui/material";

import PasswordComponent from "../../component/password/Password";

import * as Custom from "../../component/custom/CustomComponents.js";

function ChangePassword() {
  const refContainer = useRef();

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [rePasswordNew, setRePasswordNew] = useState("");
  const [widthContent, setWidthContent] = useState("");

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

  useEffect(() => {
    setWidthContent(refContainer.current.offsetWidth);
    console.log(refContainer.current.offsetWidth);
  }, [])

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2.5}
    >
      <Box ref={refContainer}>
        <PasswordComponent
          title="Mật khẩu hiện tại"
          id={1}
          onChangeValue={onChangeValue}
        />
      </Box>
      <Box>
        <PasswordComponent
          title="Mật khẩu mới"
          id={2}
          onChangeValue={onChangeValue}
        />
      </Box>
      <Box>
        <PasswordComponent
          title="Nhập lại mật khẩu mới"
          id={3}
          onChangeValue={onChangeValue}
        />
      </Box>
      <Box >
        <Custom.Button1
          disabled={!(passwordCurrent && passwordNew && rePasswordNew)}
          onClick={handleChangePassword}
          sx={{ width: `${widthContent}px` }}
        >
          Lưu thay đổi
        </Custom.Button1>
      </Box>
    </Stack>
  );
}

export default ChangePassword;
