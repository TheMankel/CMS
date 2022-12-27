import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Copyright from '../Copyright/Copyright';

const Footer = (props) => {
  const { title, navigation, contact, showDetailed } = props;

  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper' }}>
      {showDetailed && <Divider />}
      {showDetailed && (
        <Container maxWidth='lg' sx={{ my: 2 }}>
          <Box display='flex' justifyContent='space-around' flexWrap='wrap'>
            {navigation?.map((item, index) => (
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
                  {item.title}
                </Typography>
                {item.links?.map((link, index) => (
                  <Link
                    component={NavLink}
                    color='#424245'
                    variant='p'
                    underline='none'
                    key={index}
                    to={link.url}
                    textTransform='capitalize'
                    sx={{
                      '&:hover': {
                        opacity: 0.75,
                      },
                    }}>
                    {link.title}
                  </Link>
                ))}
              </List>
            ))}
            {contact && (
              <List
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
                  Contact
                </Typography>
                <Typography
                  color='#424245'
                  variant='p'
                  underline='none'
                  textTransform='capitalize'>
                  {contact.email}
                </Typography>
                <Typography
                  color='#424245'
                  variant='p'
                  underline='none'
                  textTransform='capitalize'>
                  {contact.phone}
                </Typography>
              </List>
            )}
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
      )}
      <Divider />
      <Copyright title={title} />
    </Box>
  );
};

Footer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Footer;
