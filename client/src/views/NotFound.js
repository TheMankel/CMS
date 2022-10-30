import React from 'react';

import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

const NotFound = () => {
  const primary = grey[500];
  const secondary = grey[800];
  const hover = grey[900];
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: primary,
          color: 'white',
        }}>
        <Typography variant='h1'>404</Typography>
        <Typography variant='h6'>
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant='contained'
          href='/home'
          color='inherit'
          sx={{
            mt: 2,
            backgroundColor: secondary,
            ':hover': {
              backgroundColor: hover,
            },
          }}>
          Home
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
