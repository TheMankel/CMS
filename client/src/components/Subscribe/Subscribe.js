import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AlertInfo from '../AlertInfo/AlertInfo';

const Subscribe = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [email, setEmail] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Field is empty!');
      setSeverity('error');
      setOpen(true);

      return;
    }

    if (!/@/.test(email)) {
      setMessage('Please enter a valid email address!');
      setSeverity('error');
      setOpen(true);

      return;
    }

    const data = {
      email: email,
    };

    try {
      const res = await axios.post(
        'http://localhost:8000/api/subscribe',
        data,
        {
          withCredentials: true,
        },
      );

      console.log(res);
      if (res.data?.error) {
        setMessage(res.data?.error);
        setSeverity('error');
        setOpen(true);

        return;
      }
    } catch (error) {
      console.log(error);
    }
    setMessage('You are now a subscriber!');
    setSeverity('success');
    setOpen(true);
    setEmail('');
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
        <AlertInfo
          open={open}
          handleOpen={setOpen}
          message={message}
          severity={severity}
        />
      </Box>
    </List>
  );
};

export default Subscribe;
