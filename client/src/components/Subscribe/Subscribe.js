import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
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
    <List>
      <Typography component='h5' variant='h5' fontWeight={700}>
        Subscribe Blog for latest updates
      </Typography>
      <Typography component='p' variant='p' color='#424245' gutterBottom>
        Just leave your email address so we can stay in touch
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSend}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
        }}>
        <TextField
          id='outlined-basic'
          label='Enter email address'
          variant='outlined'
          size='small'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant='contained'
          // onClick={handleSend}
          type='submit'
          sx={{
            textTransform: 'none',
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
    </List>
  );
};

export default Subscribe;
