import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import AlertInfo from '../AlertInfo/AlertInfo';

const Form = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !msg) {
      setMessage('All fields are required!');
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

    try {
      await axios.post('http://localhost:8000/api/contact', {
        firstName,
        lastName,
        email,
        msg,
      });
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong. Try again later!');
      setSeverity('error');
      setOpen(true);
    }
    setMessage('Successfully sent message!');
    setSeverity('success');
    setOpen(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMsg('');
    // setMessage('');
  };

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box
        padding={{ xs: 3, sm: 6 }}
        width={'100%'}
        component={Card}
        borderRadius={2}
        boxShadow={4}
        marginBottom={4}>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSend}>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ height: 54 }}
                label='First name'
                variant='outlined'
                color='primary'
                size='medium'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ height: 54 }}
                label='Last name'
                variant='outlined'
                color='primary'
                size='medium'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ height: 54 }}
                label='Email'
                type='email'
                variant='outlined'
                color='primary'
                size='medium'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Message'
                multiline
                rows={6}
                variant='outlined'
                color='primary'
                size='medium'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                mx='auto'
                variant='contained'
                color='primary'
                size='medium'
                fullWidth
                type='submit'
                sx={{ height: 54, textTransform: 'none' }}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography component='p' variant='body2' align='left'>
                  By clicking on "submit" you agree to our{' '}
                  <Box
                    component={NavLink}
                    to='/privacy-policy'
                    color={theme.palette.text.primary}
                    fontWeight={'700'}>
                    Privacy Policy
                  </Box>
                  .
                </Typography>
              </Box>
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
    </Box>
  );
};

export default Form;
