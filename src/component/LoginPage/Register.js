import * as React from 'react';

import LogoGG from '../../img/google.png'
import LogoFB from '../../img/facebook.png'
import { Box, Modal, Typography, TextField, Stack, Divider } from '@mui/material';

import * as CustomButton from '../../custom/CustomButton.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '80%', sm: '60%', md: '40%'},
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <CustomButton.ButtonRegister 
        variant="contained" 
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
                id="outlined-required"
                label="Email"
                variant="outlined"
                fullWidth
            />
            <TextField
                required
                id="outlined-required"
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
                id="outlined-password-input"
                label="Nhập lại mật khẩu"
                type="password"
                autoComplete="current-password"
                fullWidth
            />
            <CustomButton.ButtonLogin 
            variant="contained" 
            fullWidth
            > 
                Đăng ký 
            </CustomButton.ButtonLogin>
            <Divider flexItem > Hoặc </Divider>
            <CustomButton.ButtonLoginWith variant="outlined" fullWidth >
                <img src={LogoGG} alt="Logo" width={25}/>
                <Typography pl={2}> Đăng ký bằng GG </Typography>
            </CustomButton.ButtonLoginWith>
            <CustomButton.ButtonLoginWith variant="outlined" fullWidth >
                <img src={LogoFB} alt="Logo" width={25}/>
                <Typography pl={2}> Đăng ký bằng FB </Typography>
            </CustomButton.ButtonLoginWith>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}