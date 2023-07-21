import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

const Info = (props) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap={1}>
      <InfoIcon sx={{ fontSize: '57.6px', color: '#505050' }} />
      <Typography component='h1' variant='h5'>
        {props.message}
      </Typography>
    </Box>
  );
};

export default Info;
