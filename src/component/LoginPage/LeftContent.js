import React, { Component } from 'react';

import { Box } from '@mui/material';

class LeftContent extends Component {
    render() {
        return (
            <Box flex={2} sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
                LeftContent
            </Box>
        );
    }
}

export default LeftContent;