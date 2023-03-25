import React, { Component } from 'react';

import '../assets/css/Login.css'

import { Stack } from '@mui/material';
import Welcome from '../features/Login/Welcome';
import FormSignIn from '../features/Login/FormSignIn';

class Login extends Component {
    render() {
        return (
            <Stack 
                direction='row' 
                className='login-page'
            >
                <Welcome />
                <FormSignIn />
            </Stack>
        );
    }
}

export default Login;