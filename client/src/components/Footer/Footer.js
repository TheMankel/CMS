import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Copyright from '../Copyright.js/Copyright';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import { Divider } from '@mui/material';

const Footer = (props) => {
  const { description, title, url } = props;

  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', py: 3 }}>
      <Container maxWidth='lg'>
        <Typography component='h6' variant='h6' align='center' gutterBottom>
          {title}
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'>
          {description}
        </Typography>
        <Divider sx={{ margin: '16px 0' }} />
        <Box display='flex' justifyContent='space-around'>
          <Box>
            <Typography>CATEGORIES</Typography>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title1
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title2
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title3
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title4
              </Link>
            </List>
          </Box>
          <Box>
            <Typography>CATEGORIES</Typography>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title1
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title2
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title3
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title4
              </Link>
            </List>
          </Box>
          <Box>
            <Typography>CATEGORIES</Typography>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title1
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title2
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title3
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title4
              </Link>
            </List>
          </Box>
          <Box>
            <Typography>CATEGORIES</Typography>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title1
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title2
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title3
              </Link>
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={1}
                href='dupa'
                sx={{ px: 1 }}>
                title4
              </Link>
            </List>
          </Box>
          <Box>
            <Typography component='h5' variant='h5' fontWeight={700}>
              Subscribe Blog for latest updates
            </Typography>
            <Typography
              component='p'
              variant='p'
              color='gray'
              sx={{ mt: '16px' }}>
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
          </Box>
        </Box>
        <Copyright title={url} />
      </Container>
    </Box>
  );
};

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
