import React from "react";
import { Stack, Box } from "@mui/material";

import PasswordComponent from "../../component/password/Password";

function ChangePassword() {
  return (
    // <Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <PasswordComponent title="Mật khẩu hiện tại" />
        <PasswordComponent title="Mật khẩu mới" />
        <PasswordComponent title="Nhập lại mật khẩu mới" />
      </Stack>
    // </Box>
  );
}

export default ChangePassword;
