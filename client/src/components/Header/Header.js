import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/authContext';

const Header = (props) => {
  const { sections, title, logo } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { signOutHandler, user } = useAuth();

  const signOut = () => {
    signOutHandler();
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
                {sections?.map((section) => (
                  <ListItemButton key={section.title}>
                    <Link
                      component={NavLink}
                      color='inherit'
                      variant='button'
                      underline='none'
                      to={section.url}
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
              component={NavLink}
              color='inherit'
              underline='none'
              to='/'
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
            {sections?.map((section) => (
              <Link
                component={NavLink}
                color='inherit'
                variant='button'
                underline='none'
                key={section.title}
                to={section.url}
                sx={{ px: 1 }}>
                {section.title}
              </Link>
            ))}
          </List>
          <List>
            <Button
              component={NavLink}
              color='inherit'
              underline='none'
              to={user ? '/account' : '/login'}
              startIcon={<PermIdentityIcon />}
              onMouseOver={openMenuHandler}
              onMouseLeave={closeMenuHandler}
              sx={{
                zIndex: 1301,
                textTransform: 'none',
                minWidth: 100,
              }}>
              <Typography
                sx={{
                  display: {
                    sx: 'none',
                    md: 'block',
                  },
                }}>
                {user ? 'Account' : 'Sign In'}
              </Typography>
            </Button>
            {openMenu && user && (
              <List
                disablePadding
                sx={{
                  position: 'fixed',
                  zIndex: 1300,
                  boxShadow:
                    '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 10%)',
                  overflow: 'hidden',
                }}
                onMouseOver={openMenuHandler}
                onMouseLeave={closeMenuHandler}>
                <ListItem
                  disablePadding
                  sx={{
                    background: 'white',
                    borderRadius: 1,
                  }}>
                  <Button
                    color='inherit'
                    underline='none'
                    startIcon={<LogoutIcon />}
                    onClick={signOut}
                    sx={{
                      textTransform: 'none',
                      minWidth: 100,
                      minHeight: 36,
                    }}>
                    <Typography
                      sx={{
                        display: {
                          sx: 'none',
                          md: 'block',
                        },
                      }}>
                      Logout
                    </Typography>
                  </Button>
                </ListItem>
              </List>
            )}
          </List>
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
