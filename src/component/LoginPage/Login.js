import React, { Component } from 'react';

import '../../css/Login.css'

import { Stack } from '@mui/material';
import LeftContent from './LeftContent';
import MainContent from './MainContent';

class Login extends Component {
    render() {
        return (
            <Stack 
                direction='row' 
                className='login-page'
            >
                <LeftContent />
                <MainContent />
            </Stack>
        );
    }
}

export default Login;