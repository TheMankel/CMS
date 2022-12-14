import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { useAuth } from '../../contexts/authContext';

const ListItems = (props) => {
  const { open, handleTitle } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { signOutHandler } = useAuth();

  const handleListItemClick = (e, i) => {
    const { id } = e.currentTarget;

    setSelectedIndex(i);
    handleTitle(id);
  };

  const mainListItems = [
    {
      id: 'Dashboard',
      icon: <DashboardIcon />,
      path: 'admin/dashboard',
    },
    {
      id: 'Posts',
      icon: <ArticleIcon />,
      path: 'admin/posts',
    },
    {
      id: 'Categories',
      icon: <CategoryIcon />,
      path: 'admin/categories',
    },
    {
      id: 'Users',
      icon: <PeopleIcon />,
      path: 'admin/users',
    },
  ];

  const publicListItems = [
    {
      id: 'Logo',
      icon: <DesignServicesIcon />,
      path: 'admin/logo',
    },
    {
      id: 'Slider',
      icon: <ViewCarouselIcon />,
      path: 'admin/slider',
    },
    {
      id: 'Pinned posts',
      icon: <PushPinIcon />,
      path: 'admin/pinned-posts',
    },
    {
      id: 'About',
      icon: <GroupWorkIcon />,
      path: 'admin/about',
    },
    {
      id: 'Contact',
      icon: <ContactPageIcon />,
      path: 'admin/contact',
    },
    {
      id: 'Privacy Policy',
      icon: <PolicyIcon />,
      path: 'admin/privacy-policy',
    },
  ];

  const otherListItems = [
    {
      id: 'Homepage',
      icon: <HomeIcon />,
      function: () => {
        navigate('/');
      },
    },
    {
      id: 'Logout',
      icon: <LogoutIcon />,
      function: () => {
        signOutHandler();
        navigate('/');
      },
    },
  ];

  return (
    <>
      {mainListItems.map((item, index) => (
        <ListItemButton
          id={item.id}
          key={item.id}
          component={NavLink}
          to={item.path}
          selected={selectedIndex === index}
          onClick={(e) => handleListItemClick(e, index)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: `${open ? 'left' : 'center'}`,
            }}>
            {item.icon}
          </ListItemIcon>
          {open && <ListItemText primary={item.id} />}
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      {open && (
        <ListSubheader component='div' inset>
          Public Settings
        </ListSubheader>
      )}

      {publicListItems.map((item, index) => (
        <ListItemButton
          id={item.id}
          key={item.id}
          selected={selectedIndex === index + mainListItems.length}
          onClick={(e) => handleListItemClick(e, index + mainListItems.length)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: `${open ? 'left' : 'center'}`,
            }}>
            {item.icon}
          </ListItemIcon>
          {open && <ListItemText primary={item.id} />}
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      {open && (
        <ListSubheader component='div' inset>
          Other
        </ListSubheader>
      )}

      {otherListItems.map((item) => (
        <ListItemButton
          id={item.id}
          key={item.id}
          onClick={item.function}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: `${open ? 'left' : 'center'}`,
            }}>
            {item.icon}
          </ListItemIcon>
          {open && <ListItemText primary={item.id} />}
        </ListItemButton>
      ))}
    </>
  );
};

export default ListItems;
