import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Title from '../../components/Title/Title';
import ActionButtons from '../../components/ActionButtons/ActionButtons';

import axios from 'axios';

const ContactAdmin = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setEmail('');
    setPhone('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const phoneRegex =
      /^\+?[0-9]{2,3}?[-. ]?[0-9]{3}[-. ]?[0-9]{3}[-. ]?[0-9]{3}$/;

    const isValidEmail = emailRegex.test(email);
    const isValidPhone = phoneRegex.test(phone);

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address');
      setOpen(true);
      return;
    }

    if (!isValidPhone) {
      setErrorMessage('Please enter a valid phone number starting with +');
      setOpen(true);
      return;
    }

    try {
      const data = {
        email: email,
        phone: phone,
      };

      await axios.post('http://localhost:8000/api/update-contact', data, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
    setEmail('');
    setPhone('');
  };

  return (
    <Box
      component='main'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <Button color='secondary' size='small' onClick={handleClose}>
            OK
          </Button>
        }></Snackbar>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              component='form'
              noValidate
              autoComplete='off'
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
              <Box>
                <Title>Change Email</Title>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='set-email'
                  label='Write new email'
                  variant='outlined'
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box>
                <Title>Change Phone Number</Title>
                <TextField
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id='set-phone'
                  label='Write new phone number'
                  variant='outlined'
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </Box>
              <ActionButtons
                handleCancel={handleCancel}
                handleUpdate={handleUpdate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactAdmin;
