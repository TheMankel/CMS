import React from 'react';
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

const Form = () => {
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
        <Box component='form' noValidate autoComplete='off'>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ height: 54 }}
                label='First name'
                variant='outlined'
                color='primary'
                size='medium'
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
                    to='#0'
                    color={theme.palette.text.primary}
                    fontWeight={'700'}>
                    Privacy Policy
                  </Box>
                  ,{' '}
                  <Box
                    component={NavLink}
                    to='#0'
                    color={theme.palette.text.primary}
                    fontWeight={'700'}>
                    Data Policy
                  </Box>{' '}
                  and{' '}
                  <Box
                    component={NavLink}
                    to='#0'
                    color={theme.palette.text.primary}
                    fontWeight={'700'}>
                    Cookie Policy
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
