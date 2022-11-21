import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ForgotPassword = () => {
  return (
    <>
      <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100%'}>
        <Container>
          <Box>
            <Box
              display='flex'
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              width={'100%'}
              maxWidth={800}
              margin={'0 auto'}>
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography color='text.secondary' variant='h6'>
                  RECOVER ACCOUNT
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 700,
                  }}>
                  Forgot your password?
                </Typography>
                <Typography color='text.secondary' marginBottom={5}>
                  Enter your email address below and we'll get you back on
                  track.
                </Typography>
              </Box>
            </Box>
            <Box component='form'>
              <Grid item container xs={12} marginBottom={2}>
                <Box
                  display='flex'
                  flexDirection={{ sm: 'row' }}
                  alignItems={{ sm: 'stretch' }}
                  width={'100%'}
                  maxWidth={800}
                  margin={'0 auto'}>
                  <TextField
                    label='Email *'
                    variant='outlined'
                    name={'email'}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display='flex'
                  flexDirection={{ sm: 'row' }}
                  alignItems={{ sm: 'center' }}
                  justifyContent={'space-between'}
                  width={'100%'}
                  maxWidth={800}
                  margin={'0 auto'}>
                  <Box>
                    <Button
                      size={'large'}
                      variant={'outlined'}
                      component={NavLink}
                      to={'/'}
                      sx={{ textTransform: 'none' }}>
                      Back to home
                    </Button>
                  </Box>
                  <Button
                    size={'large'}
                    variant={'contained'}
                    sx={{ textTransform: 'none' }}>
                    Send reset link
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
