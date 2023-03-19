import React from 'react';

import { Box } from '@mui/material';

function LeftContent() {
    
    return (
        <Box flex={2} sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
            LeftContent
        </Box>
    );
}

export default LeftContent;