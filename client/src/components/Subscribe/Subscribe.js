import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Subscribe = () => {
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
            <Typography component='h5' variant='h5'>
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
                sx={{
                  textTransform: 'none',
                  backgroundColor: 'gray',
                  '&:hover': { backgroundColor: '#454545' },
                }}>
                Subscribe Now
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default Subscribe;
