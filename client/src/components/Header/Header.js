import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { useAuth } from '../../contexts/authContext';

const Header = (props) => {
  const { user, sections, title, logo } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);
  const btnLabel = user ? 'Account' : 'Sign In';
  const navigate = useNavigate();
  const { signOutHandler, setRole } = useAuth();

  const signOut = () => {
    signOutHandler();
    setRole();
    navigate('/');
  };

  const openMenuHandler = () => {
    setOpenMenu(true);
  };

  const closeMenuHandler = () => {
    setOpenMenu(false);
  };

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
          <Drawer
            anchor='left'
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}>
            <Box p={2} height={1} textAlign='left'>
              <IconButton
                color='inherit'
                aria-label='close drawer'
                onClick={() => setOpenDrawer(false)}
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
              onClick={() => setOpenDrawer(true)}
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
          <Button
            ref={anchorRef}
            id='menu-button'
            aria-controls={openMenu ? 'menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup='true'
            color='inherit'
            underline='none'
            href='/login'
            startIcon={<PermIdentityIcon />}
            onMouseOver={openMenuHandler}
            onMouseLeave={closeMenuHandler}
            sx={{
              display: 'flex',
              alignItems: 'center',
              zIndex: 1301,
              textTransform: 'none',
            }}>
            <Typography
              sx={{
                display: {
                  sx: 'none',
                  md: 'block',
                },
              }}>
              {btnLabel}
            </Typography>
          </Button>
          <Menu
            autoFocus={false}
            id='menu'
            anchorEl={anchorRef.current}
            open={openMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}>
            <MenuItem
              onClick={closeMenuHandler}
              onMouseOver={openMenuHandler}
              onMouseLeave={closeMenuHandler}>
              <Link color='inherit' underline='none' href='/account'>
                My account
              </Link>
            </MenuItem>
            <MenuItem
              onClick={closeMenuHandler}
              onMouseOver={openMenuHandler}
              onMouseLeave={closeMenuHandler}>
              <Link color='inherit' underline='none' onClick={signOut}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
      <Divider sx={{ boxShadow: 1 }} />
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
