import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

const NotFound = () => {
  const primary = grey[500];
  const secondary = grey[800];
  const hover = grey[900];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: primary,
      }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px',
        }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: 2,
            textAlign: 'center',
          }}>
          <Typography variant='h1'>404</Typography>
          <Typography variant='h6'>
            The page you're looking for doesn't exist.
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: '16px' }}>
          <Button
            variant='contained'
            href='/home'
            color='inherit'
            sx={{
              color: 'white',
              backgroundColor: secondary,
              ':hover': {
                backgroundColor: hover,
              },
            }}>
            Home
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default NotFound;
