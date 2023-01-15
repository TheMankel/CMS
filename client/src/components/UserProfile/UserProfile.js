import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AboutSection from '../ProfileSections/AboutSection';
import DeleteAccountSection from '../ProfileSections/DeleteAccountSection';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import { createRef, uploadImage, downloadImage } from '../../lib/storage';
import { verifyImage } from '../../lib/file-type';
import { useAuth } from '../../contexts/authContext';
import axios from 'axios';

const UserProfile = () => {
  const { user, role, signOutHandler, updateUserPhoto } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const userImagesRef = createRef(`userImages/${user?.uid}`);
  const navigate = useNavigate();

  useEffect(() => {
    setImage(user?.photoURL);
    setUserName(user?.displayName);
  }, [user]);

  const handleUpload = async (e) => {
    try {
      const imageFile = e.target.files[0];
      const status = await verifyImage(imageFile);

      console.log(status);
      if (status !== 'Ok' || !imageFile) {
        setMessage('Please upload a photo with the proper format!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      await uploadImage(userImagesRef, imageFile);
      const img = await downloadImage(userImagesRef);
      handleImageChange(img);
      e.target.value = '';
    } catch (err) {
      console.log(err);
    }
    setMessage('Succesfully updated avatar image!');
    setSeverity('success');
    setOpen(true);
  };

  const handleImageChange = async (imageUrl) => {
    try {
      await updateUserPhoto(imageUrl);
      setImage(imageUrl);
      await axios.post('http://localhost:8000/api/update-user-photo', {
        uid: user.uid,
        photoURL: imageUrl,
      });
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong. Try again later!');
      setSeverity('error');
      setOpen(true);
    }
  };

  const handleListItemClick = (i) => {
    setSelectedIndex(i);
  };

  const handleSignOut = () => {
    signOutHandler();
    navigate('/');
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={4} p={2}>
          <Box align={'center'}>
            <Avatar
              alt='User Avatar'
              src={image}
              sx={{
                height: {
                  xs: 120,
                  md: 160,
                },
                width: {
                  xs: 120,
                  md: 160,
                },
              }}
            />
          </Box>
          <Box my={2} px={2} align={'center'}>
            <Typography variant='h6' component='div'>
              {userName}
            </Typography>
            <Typography
              variant={'subtitle2'}
              component='div'
              color={'textSecondary'}>
              {role ? 'Admin profile' : 'User profile'}
            </Typography>
          </Box>
          <Divider />
          <Box mt={2}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={() => handleListItemClick(0)}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary='About' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component='label' onChange={handleUpload}>
                  <ListItemIcon>
                    <PhotoCameraIcon />
                  </ListItemIcon>
                  <ListItemText primary='Change Avatar' />
                  <input hidden accept='image/*' type='file' />
                </ListItemButton>
              </ListItem>
              {!role && (
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={() => handleListItemClick(1)}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Delete account' />
                  </ListItemButton>
                </ListItem>
              )}
              {role && (
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to='/admin'>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Admin dashboard' />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem disablePadding>
                <ListItemButton onClick={handleSignOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} p={2}>
          <Box
            borderLeft={1}
            px={4}
            borderColor={'#0000001f'}
            sx={{ borderWidth: 'thin', height: '100%' }}>
            {selectedIndex === 0 && (
              <AboutSection handleUserName={setUserName} />
            )}
            {selectedIndex === 1 && (
              <DeleteAccountSection userImagesRef={userImagesRef} />
            )}
          </Box>
        </Grid>
      </Grid>
      <AlertInfo
        open={open}
        handleOpen={setOpen}
        severity={severity}
        message={message}
      />
    </Card>
  );
};

export default UserProfile;
