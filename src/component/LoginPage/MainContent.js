import React, { Component } from 'react';

import '../../css/Login.css'
import LogoGG from '../../img/google.png'
import LogoFB from '../../img/facebook.png'
import * as CustomButton from '../../custom/CustomButton.js'
//import * as CustomTextField from '../../custom/CustomTextField.js'

import { Box, Stack, TextField, Link, Divider, Typography } from '@mui/material';

class MainContent extends Component {
    render() {
        return (
            <Box 
                flex={2}
            >
                <Stack 
                    spacing={2}
                    sx={{width: {xs: '80%', sm: '70%'}}}
                    p={{ xs: 1, sm: 2, md: 4}} 
                    m={{ xs: 1, sm: 2, md: 5}}
                    bgcolor='#ffffff' 
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={{ xs: 1, sm: 2, md: 5}}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                    />
                    <CustomButton.ButtonLogin variant="contained" fullWidth> Đăng nhập </CustomButton.ButtonLogin>
                    <Link href="#" underline="hover">
                        {'Quên mật khẩu?'}
                    </Link>
                    <Divider > Hoặc </Divider>
                    <CustomButton.ButtonLoginWith variant="outlined" fullWidth >
                        <img src={LogoGG} alt="Logo" width={25}/>
                        <Typography pl={2}> Đăng nhập bằng GG </Typography>
                    </CustomButton.ButtonLoginWith>
                    <CustomButton.ButtonLoginWith variant="outlined" fullWidth >
                        <img src={LogoFB} alt="Logo" width={25}/>
                        <Typography pl={2}> Đăng nhập bằng FB </Typography>
                    </CustomButton.ButtonLoginWith>
                    <CustomButton.ButtonRegister variant="contained" fullWidth>
                        Tạo tài khoản
                    </CustomButton.ButtonRegister>
                </Stack>
            </Box>
        );
    }
}

export default MainContent;