import React from 'react';

import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import LinkButton from '../components/Buttons/LinkButton';

const NotFound = () => {
  const primary = purple[500];
  const secondary = purple[900];
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
        }}>
        <Typography variant='h1' style={{ color: 'white' }}>
          404
        </Typography>
        <Typography variant='h6' style={{ color: 'white' }}>
          The page you're looking for doesn't exist.
        </Typography>
        <LinkButton
          label='Home'
          sx={{
            backgroundColor: secondary,
            mt: 2,
          }}
        />
      </Box>
    </>
  );
};

export default NotFound;
