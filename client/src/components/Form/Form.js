import React, { useState } from 'react';
import axios from 'axios';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Form = (props) => {
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !msg) {
      setFormError('All fields are required.');
      return;
    }

    if (!/@/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    e.preventDefault();
    setSent(true);

    try {
      await axios.post('http://localhost:8000/api/contact', {
        firstName,
        lastName,
        email,
        msg,
      });
    } catch (error) {
      console.log(error);
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setMsg('');
    setOpen(true);
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
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity='success'
                  sx={{ width: '100%' }}>
                  Sending email success!
                </Alert>
              </Snackbar>
              {formError && (
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={true}
                  autoHideDuration={4000}
                  onClose={() => setFormError('')}>
                  <Alert onClose={() => setFormError('')} severity='error'>
                    {formError}
                  </Alert>
                </Snackbar>
              )}
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
                    to='privacy-policy'
                    color={theme.palette.text.primary}
                    fontWeight={'700'}>
                    Privacy Policy
                  </Box>
                  .
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
