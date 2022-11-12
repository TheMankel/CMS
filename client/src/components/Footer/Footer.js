import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Copyright from '../Copyright.js/Copyright';

const Footer = (props) => {
  const { title, categories } = props;

  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper' }}>
      <Divider sx={{ marginBottom: '16px' }} />
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='space-around' flexWrap='wrap'>
          {categories.map((category, index) => (
            <List
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Typography
                component='h5'
                variant='h5'
                textTransform='capitalize'
                fontWeight={700}>
                {category.title.toLowerCase()}
              </Typography>
              {category.links.map((link, index) => (
                <Link
                  color='#424245'
                  variant='p'
                  underline='none'
                  key={index}
                  href={link.toLowerCase()}
                  textTransform='capitalize'>
                  {link.toLowerCase()}
                </Link>
              ))}
            </List>
          ))}
          <List>
            <Typography component='h5' variant='h5' fontWeight={700}>
              Subscribe Blog for latest updates
            </Typography>
            <Typography
              component='p'
              variant='p'
              color='#424245'
              sx={{ mt: '16px' }}>
              Just leave your email address so we can stay in touch
            </Typography>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '24px',
                mt: '16px',
              }}>
              <TextField
                id='outlined-basic'
                label='Enter email address'
                variant='outlined'
                size='small'
              />
              <Button
                variant='contained'
                sx={{
                  textTransform: 'none',
                }}>
                Subscribe Now
              </Button>
            </Box>
          </List>
        </Box>
      </Container>
      <Divider sx={{ mt: '16px' }} />
      <Copyright title={title} />
    </Box>
  );
};

Footer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Footer;
