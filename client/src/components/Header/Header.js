import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Header = (props) => {
  const { sections, title, logo } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container maxWidth='lg' disableGutters={true}>
        <Toolbar
          component='nav'
          variant='dense'
          sx={{
            justifyContent: 'space-between',
            overflowX: 'auto',
          }}>
          <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
            <Box p={2} height={1} textAlign='left'>
              <IconButton
                color='inherit'
                aria-label='close drawer'
                onClick={() => setOpen(false)}
                sx={{ mb: 2 }}>
                <CloseIcon />
              </IconButton>
              <Divider sx={{ mb: 1 }} />
              <List>
                {sections.map((section) => (
                  <ListItemButton key={section.title}>
                    <Link
                      color='inherit'
                      variant='button'
                      underline='none'
                      href={section.url}
                      sx={{ px: 1, flexShrink: 0 }}>
                      {section.title}
                    </Link>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Drawer>
          <div style={{ display: 'flex' }}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={() => setOpen(true)}
              sx={{
                display: {
                  md: 'none',
                },
              }}>
              <MenuIcon />
            </IconButton>
            <Link
              color='inherit'
              underline='none'
              href='/'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              {logo && (
                <img
                  src={logo}
                  alt='Logo'
                  style={{
                    height: '40px',
                    padding: '8px',
                  }}
                />
              )}
              <Typography
                component='h2'
                variant='h5'
                color='inherit'
                align='left'
                sx={{ flex: 1, py: 2 }}>
                {title}
              </Typography>
            </Link>
          </div>
          <List
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
              flexWrap: 'wrap',
            }}>
            {sections.map((section) => (
              <Link
                color='inherit'
                variant='button'
                underline='none'
                key={section.title}
                href={section.url}
                sx={{ px: 1 }}>
                {section.title}
              </Link>
            ))}
          </List>
          <Link
            color='inherit'
            underline='none'
            href='/login'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <PermIdentityIcon />
            <Typography
              sx={{
                display: {
                  sx: 'none',
                  md: 'block',
                },
              }}>
              Sign In
            </Typography>
          </Link>
        </Toolbar>
      </Container>
      <Divider sx={{ mb: '24px', boxShadow: 1 }} />
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
