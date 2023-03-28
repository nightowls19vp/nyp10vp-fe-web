import * as React from "react";

import "../../assets/css/Login.css";
import LogoGG from "../../assets/img/google.png";
import LogoFB from "../../assets/img/facebook.png";
import * as CustomButton from "../../component/custom/CustomButton.js";
import DateTimePicker from "../../component/DateTimePicker";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Stack,
  Divider,
  Container,
} from "@mui/material";

import api from "../../http/http-common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "60%", md: "40%" },
  height: "calc(100vh - 100px)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function FormSignUp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  const handleRegister = () => {
    //
  };

  //   const submitRegister = async (formData) => {
  //     try {
  //       const response = await api.post("/auth/register", formData);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Container disableGutters maxWidth={false}>
      <CustomButton.ButtonRegister
        variant="contained"
        fullWidth
        onClick={handleOpen}
      >
        Tạo tài khoản
      </CustomButton.ButtonRegister>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng ký
          </Typography>
          <Stack id="modal-modal-description" mt={2} spacing={2}>
            <TextField
              required
              id="outlined-required-email"
              label="Username"
              variant="outlined"
              fullWidth
            />
            <TextField
              required
              id="outlined-required-email"
              label="name"
              variant="outlined"
              fullWidth
            />
            <TextField
              required
              id="outlined-required-email"
              label="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              required
              id="outlined-required-phone"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-password-input"
              label="Nhập mật khẩu"
              type="password"
              autoComplete="current-password"
              fullWidth
            />
            <TextField
              id="outlined-the-password-input"
              label="Nhập lại mật khẩu"
              type="password"
              autoComplete="current-password"
              fullWidth
            />
            <CustomButton.ButtonLogin
              variant="contained"
              fullWidth
              onClick={handleRegister}
            >
              Đăng ký
            </CustomButton.ButtonLogin>
            <Divider flexItem> Hoặc </Divider>
            <CustomButton.ButtonLoginWith variant="outlined" fullWidth>
              <img src={LogoGG} alt="Logo" width={25} />
              <Typography pl={2}> Đăng ký bằng GG </Typography>
            </CustomButton.ButtonLoginWith>
            <CustomButton.ButtonLoginWith variant="outlined" fullWidth>
              <img src={LogoFB} alt="Logo" width={25} />
              <Typography pl={2}> Đăng ký bằng FB </Typography>
            </CustomButton.ButtonLoginWith>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
