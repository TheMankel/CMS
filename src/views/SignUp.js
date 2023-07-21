import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../contexts/authContext';
import AlertInfo from '../components/AlertInfo/AlertInfo';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUpHandler, updateUserFullName } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const theme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formRef = new FormData(e.currentTarget);

    try {
      if (
        !formRef.get('firstName') ||
        !formRef.get('lastName') ||
        !formRef.get('email') ||
        !formRef.get('password')
      ) {
        setMessage('Please provide all data!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      setLoading(true);

      const userCredential = await signUpHandler(
        formRef.get('email'),
        formRef.get('password'),
      );

      if (userCredential?.code === 400) {
        setMessage(userCredential?.message || 'Wrong email or password!');
        setSeverity('error');
        setOpen(true);
        setLoading(false);

        return;
      }

      const { user } = userCredential;

      const data = {
        uid: user.uid,
        firstName: formRef.get('firstName'),
        lastName: formRef.get('lastName'),
        email: formRef.get('email'),
        created: +user.metadata.createdAt,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        data,
        {
          withCredentials: true,
        },
      );

      await updateUserFullName(
        formRef.get('firstName'),
        formRef.get('lastName'),
      );

      setTimeout(() => {
        if (res?.data?.role === 'admin') navigate('/admin/dashboard');
        else navigate('/');
      }, 250);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        position='relative'
        minHeight='calc(100vh - 118px)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link
                    component={NavLink}
                    to='/login'
                    underline='none'
                    variant='body2'
                    sx={{
                      '&:hover': {
                        opacity: 0.75,
                      },
                    }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
                <AlertInfo
                  open={open}
                  handleOpen={setOpen}
                  severity={severity}
                  message={message}
                />
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
