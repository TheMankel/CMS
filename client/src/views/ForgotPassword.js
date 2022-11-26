import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../contexts/authContext';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formRef = new FormData(e.currentTarget);

    console.log({
      email: formRef.get('email'),
    });
    try {
      if (!formRef.get('email')) return;

      setLoading(true);

      await forgotPassword(formRef.get('email'));

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        position='relative'
        minHeight='calc(100vh - 118px)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'>
        <Container>
          <Box
            display='flex'
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'center' }}
            width='100%'
            maxWidth={800}
            mx='auto'>
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
                Enter your email address below and we'll get you back on track.
              </Typography>
            </Box>
          </Box>
          <Box component='form' onSubmit={handleSubmit}>
            <Grid item container xs={12} marginBottom={2}>
              <Box
                display='flex'
                flexDirection={{ sm: 'row' }}
                alignItems={{ sm: 'stretch' }}
                width='100%'
                maxWidth={800}
                margin='0 auto'>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
              </Box>
            </Grid>
            <Grid item container xs={12}>
              <Box
                display='flex'
                flexDirection={{ sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent='space-between'
                width='100%'
                maxWidth={800}
                margin='0 auto'>
                <Button
                  size='large'
                  variant='outlined'
                  component={NavLink}
                  to='/'
                  sx={{ textTransform: 'none' }}>
                  Back to home
                </Button>
                <Button
                  type='submit'
                  disabled={loading}
                  variant='contained'
                  size='large'
                  sx={{ textTransform: 'none' }}>
                  Send reset link
                </Button>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
