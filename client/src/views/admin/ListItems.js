import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const { open, handleTitle, blog } = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const { signOutHandler } = useAuth();

  const handleListItemClick = (e, i) => {
    const { id } = e.currentTarget;

    setSelectedIndex(i);
    handleTitle(id);
  };

  const mainListItems = useMemo(
    () => [
      {
        index: 0,
        id: 'Dashboard',
        icon: <DashboardIcon />,
        path: 'admin/dashboard',
      },
      {
        index: 1,
        id: 'Posts',
        icon: <ArticleIcon />,
        path: 'admin/posts',
      },
      {
        index: 2,
        id: 'Categories',
        icon: <CategoryIcon />,
        path: 'admin/categories',
      },
      {
        index: 3,
        id: 'Users',
        icon: <PeopleIcon />,
        path: 'admin/users',
      },
    ],
    [],
  );

  const publicListItems = useMemo(
    () => [
      {
        index: 4,
        id: 'Blog',
        icon: <DesignServicesIcon />,
        path: 'admin/blog',
      },
      {
        index: 5,
        id: 'Slider',
        icon: <ViewCarouselIcon />,
        path: 'admin/slider',
      },
      {
        index: 6,
        id: 'Pinned posts',
        icon: <PushPinIcon />,
        path: 'admin/pinned-posts',
      },
      {
        index: 7,
        id: 'About',
        icon: <GroupWorkIcon />,
        path: 'admin/about',
      },
      {
        index: 8,
        id: 'Contact',
        icon: <ContactPageIcon />,
        path: 'admin/contact',
      },
      {
        index: 9,
        id: 'Privacy Policy',
        icon: <PolicyIcon />,
        path: 'admin/privacy-policy',
      },
    ],
    [],
  );

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

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");

    if (blog.title !== '') document.title = blog.title;
    if (blog.logo !== '') link.href = blog.logo;

    const path = location.pathname.replace('/admin/', '');
    const items = mainListItems.concat(publicListItems);

    const selectedItem = items.find(
      (item) => item.id.toLowerCase().replace(' ', '-') === path,
    );

    if (!selectedItem) return;

    handleTitle(selectedItem?.id);
    setSelectedIndex(selectedItem?.index);
  }, [location, handleTitle, mainListItems, publicListItems, blog]);

  return (
    <>
      {mainListItems.map((item, index) => (
        <ListItemButton
          id={item.id}
          key={item.id}
          component={NavLink}
          to={item.path}
          selected={selectedIndex === item.index}
          onClick={(e) => handleListItemClick(e, item.index)}
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
          component={NavLink}
          to={item.path}
          selected={selectedIndex === item.index}
          onClick={(e) => handleListItemClick(e, item.index)}
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
