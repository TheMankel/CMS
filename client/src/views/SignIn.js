import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../components/Copyright.js/Copyright';
import { useAuth } from '../contexts/authContext';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const { signInHandler } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formRef = new FormData(e.currentTarget);

    console.log({
      email: formRef.get('email'),
      password: formRef.get('password'),
    });

    try {
      if (!formRef.get('email') || !formRef.get('password')) return;

      setLoading(true);

      const userCredential = await signInHandler(
        formRef.get('email'),
        formRef.get('password'),
      );

      const { user } = userCredential;

      console.log(user);

      const data = {
        uid: user.uid,
        email: formRef.get('email'),
      };

      const res = await axios.post('http://localhost:8000/api/signin', data, {
        withCredentials: true,
      });

      console.log(res.data);

      if (res?.data?.role === 'admin') navigate('/dashboard');
      else navigate('/');
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
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
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={NavLink}
                    to='/forgot-password'
                    variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={NavLink} to='/register' variant='body2'>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
