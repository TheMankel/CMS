import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Subscribe = () => {
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setOpen(true);

    if (!email) {
      setEmailError('Field is empty.');
      return;
    }

    if (!/@/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const data = {
      email: email,
    };

    try {
      await axios.post('http://localhost:8000/api/subscribe', data, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }

    setEmail('');
    setEmailError('');
  };

  return (
    <Container maxWidth='sm'>
      <Grid item xs={12} md={6} sx={{ mt: 3, mb: 1 }}>
        <Card sx={{ display: 'flex', borderRadius: '16px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              gap: 2,
              width: '100%',
              py: 3,
              textAlign: 'center',
            }}>
            <Typography component='h5' variant='h5' fontWeight={700}>
              Subscribe Blog for latest updates
            </Typography>
            <Typography component='p' variant='p' color='gray'>
              Just leave your email address so we can stay in touch
            </Typography>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
              }}>
              <TextField
                id='outlined-basic'
                label='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
                sx={{
                  '& label.Mui-focused': {
                    color: '#454545',
                  },
                  '& .MuiOutlinedInput-root': {
                    ' &.Mui-focused fieldset ': {
                      borderColor: '#454545',
                    },
                  },
                }}
              />
              <Button
                variant='contained'
                onClick={handleSend}
                sx={{
                  textTransform: 'none',
                  backgroundColor: 'gray',
                  '&:hover': { backgroundColor: '#454545' },
                }}>
                Subscribe Now
              </Button>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity={emailError ? 'error' : 'success'}
                  sx={{ width: '100%' }}>
                  {emailError ? emailError : 'Sending email success!'}
                </Alert>
              </Snackbar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default Subscribe;
