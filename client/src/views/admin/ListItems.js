import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PushPinIcon from '@mui/icons-material/PushPin';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PolicyIcon from '@mui/icons-material/Policy';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary='Posts' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary='Categories' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Users' />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component='div' inset>
      Public Settings
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <DesignServicesIcon />
      </ListItemIcon>
      <ListItemText primary='Logo' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ViewCarouselIcon />
      </ListItemIcon>
      <ListItemText primary='Slider' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PushPinIcon />
      </ListItemIcon>
      <ListItemText primary='Pinned posts' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupWorkIcon />
      </ListItemIcon>
      <ListItemText primary='About' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContactPageIcon />
      </ListItemIcon>
      <ListItemText primary='Contact' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PolicyIcon />
      </ListItemIcon>
      <ListItemText primary='Privacy Policy' />
    </ListItemButton>
  </>
);

export const otherListItems = (
  <>
    <ListSubheader component='div' inset>
      Other
    </ListSubheader>
    <ListItemButton component={NavLink} to='/'>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary='Homepage' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary='Logout' />
    </ListItemButton>
  </>
);

const ListItems = (props) => {
  const { open } = props;

  return (
    <>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <DashboardIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Dashboard' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <ArticleIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Posts' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <CategoryIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Categories' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <PeopleIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Users' />}
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      {open && (
        <ListSubheader component='div' inset>
          Public Settings
        </ListSubheader>
      )}
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <DesignServicesIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Logo' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <ViewCarouselIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Slider' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <PushPinIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Pinned posts' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <GroupWorkIcon />
        </ListItemIcon>
        {open && <ListItemText primary='About' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <ContactPageIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Contact' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <PolicyIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Privacy Policy' />}
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      {open && (
        <ListSubheader component='div' inset>
          Other
        </ListSubheader>
      )}
      <ListItemButton
        component={NavLink}
        to='/'
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <HomeIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Homepage' />}
      </ListItemButton>
      <ListItemButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: `${open ? 'left' : 'center'}`,
          }}>
          <LogoutIcon />
        </ListItemIcon>
        {open && <ListItemText primary='Logout' />}
      </ListItemButton>
    </>
  );
};

export default ListItems;
