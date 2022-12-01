import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import { Container } from '@mui/system';
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
import { useAuth } from '../../contexts/authContext';
import {
  createRef,
  uploadImage,
  downloadImage,
  // deleteImage,
} from '../../lib/storage';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Backdrop from '@mui/material/Backdrop';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import AboutModal from '../AboutModal/AboutModal';
import AboutSection from '../ProfileSections/AboutSection';
import DeleteAccountSection from '../ProfileSections/DeleteAccountSection';

const UserProfile = () => {
  const { user, role, signOutHandler, updateUserPhoto } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [selectedInfoIndex, setSelectedInfoIndex] = useState(-1);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState('');
  // const [open, setOpen] = useState(false);
  const userImagesRef = createRef(`userImages/${user?.uid}`);
  const navigate = useNavigate();
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedInfoIndex(-1);
  // };

  // useEffect(() => {
  //   if (!image) setImage(user?.photoURL);
  // }, [user, image]);

  useEffect(() => {
    setImage(user?.photoURL);
    setUserName(user?.displayName);
    console.log(user);
  }, [user]);

  const handleUpload = async (e) => {
    try {
      const imageFile = e.target.files[0];
      if (!imageFile) return;

      await uploadImage(userImagesRef, imageFile);
      await downloadImage(userImagesRef, handleImageChange);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = async (imageUrl) => {
    console.log(imageUrl);
    await updateUserPhoto(imageUrl);
    setImage(imageUrl);
    console.log(user?.photoURL);
  };

  const handleListItemClick = (i) => {
    setSelectedIndex(i);
  };

  // const handleSelectModal = (i) => {
  //   setSelectedInfoIndex(i);
  // };

  const handleSignOut = () => {
    signOutHandler();
    navigate('/');
  };

  // const handleDeleteUser = async () => {
  //   try {
  //     const { uid } = user;

  //     const res = await axios.post('http://localhost:8000/api/delete-user', {
  //       uid,
  //     });

  //     if (res.status !== 200) return;

  //     if (image) deleteImage(userImagesRef);

  //     deleteUserHandler();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const userData = [
  //   {
  //     id: 'firstname',
  //     label: 'First name',
  //     defaultValue: user?.displayName.split(' ')[0],
  //     disabled: false,
  //     required: false,
  //     type: 'text',
  //   },
  //   {
  //     id: 'lastname',
  //     label: 'Last name',
  //     defaultValue: user?.displayName.split(' ')[1],
  //     disabled: false,
  //     required: false,
  //     type: 'text',
  //   },
  //   {
  //     id: 'phone-number',
  //     label: 'Phone number',
  //     defaultValue: user?.phoneNumber,
  //     disabled: false,
  //     required: false,
  //     type: 'text',
  //   },
  // ];

  // const emailAddressData = [
  //   {
  //     id: 'current-email',
  //     label: 'Current email',
  //     defaultValue: user?.email,
  //     disabled: true,
  //     required: false,
  //     type: 'email',
  //   },
  //   {
  //     id: 'new-email',
  //     label: 'New email',
  //     defaultValue: '',
  //     disabled: false,
  //     required: true,
  //     type: 'email',
  //   },
  //   {
  //     id: 'password',
  //     label: 'Confirm with password',
  //     defaultValue: '',
  //     disabled: false,
  //     required: true,
  //     type: 'password',
  //   },
  // ];

  // const passwordData = [
  //   {
  //     id: 'current-password',
  //     label: 'Current password',
  //     defaultValue: '',
  //     disabled: false,
  //     required: true,
  //     type: 'password',
  //   },
  //   {
  //     id: 'new-password',
  //     label: 'New password',
  //     defaultValue: '',
  //     disabled: false,
  //     required: true,
  //     type: 'password',
  //   },
  //   {
  //     id: 'repeat-new-password',
  //     label: 'Repeat new password',
  //     defaultValue: '',
  //     disabled: false,
  //     required: true,
  //     type: 'password',
  //   },
  // ];

  // const About = (
  //   <Box>
  //     <Typography gutterBottom variant='h4' component='div' fontSize={24}>
  //       User info
  //     </Typography>
  //     <Box my={2}>
  //       <Typography gutterBottom variant='h5' component='div' fontSize={16}>
  //         Your details
  //       </Typography>
  //       <Box
  //         border={1}
  //         borderRadius={2}
  //         borderColor='#dddddd'
  //         padding={2}
  //         minHeight={50}
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}>
  //         <Typography variant='h6' component='div' fontSize={14}>
  //           {user?.displayName}
  //         </Typography>
  //         <Button
  //           onClick={() => {
  //             handleOpen();
  //             handleSelectModal(0);
  //           }}
  //           sx={{ textTransform: 'capitalize', padding: 0 }}>
  //           Change
  //         </Button>
  //       </Box>
  //     </Box>
  //     <Box my={2}>
  //       <Typography gutterBottom variant='h5' component='div' fontSize={16}>
  //         Email address
  //       </Typography>
  //       <Box
  //         border={1}
  //         borderRadius={2}
  //         borderColor='#dddddd'
  //         padding={2}
  //         minHeight={50}
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}>
  //         <Typography variant='h6' component='div' fontSize={14}>
  //           {user?.email}
  //         </Typography>
  //         <Button
  //           onClick={() => {
  //             handleOpen();
  //             handleSelectModal(1);
  //           }}
  //           sx={{ textTransform: 'capitalize', padding: 0 }}>
  //           Change
  //         </Button>
  //       </Box>
  //     </Box>
  //     <Box my={2}>
  //       <Typography gutterBottom variant='h5' component='div' fontSize={16}>
  //         Password
  //       </Typography>
  //       <Box
  //         border={1}
  //         borderRadius={2}
  //         borderColor='#dddddd'
  //         padding={2}
  //         minHeight={50}
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}>
  //         <Typography variant='h6' component='div'>
  //           ••••••••
  //         </Typography>
  //         <Button
  //           onClick={() => {
  //             handleOpen();
  //             handleSelectModal(2);
  //           }}
  //           sx={{ textTransform: 'capitalize', padding: 0 }}>
  //           Change
  //         </Button>
  //       </Box>
  //     </Box>
  //     <AboutModal
  //       open={open && selectedInfoIndex === 0}
  //       handleClose={handleClose}
  //       title='Your data'
  //       data={userData}
  //     />
  //     <AboutModal
  //       open={open && selectedInfoIndex === 1}
  //       handleClose={handleClose}
  //       title='Change e-mail address'
  //       data={emailAddressData}
  //     />
  //     <AboutModal
  //       open={open && selectedInfoIndex === 2}
  //       handleClose={handleClose}
  //       title='Change password'
  //       data={passwordData}
  //     />
  //   </Box>
  // );

  // const About = <AboutSection user={user} />;

  // const DeleteAccount = (
  //   <Box>
  //     <Typography gutterBottom variant='h4' component='div' fontSize={24}>
  //       Delete account
  //     </Typography>
  //     <Box my={2}>
  //       <Typography my={1} variant='h5' component='div' fontSize={16}>
  //         Are you sure you want to delete your account?
  //       </Typography>
  //       <Typography my={1} variant='h5' component='div' fontSize={16}>
  //         If you click on this button, you will delete your account in our blog.
  //         You will be automatically log out and not able to access your account
  //         anymore.
  //       </Typography>
  //       <Typography my={1} variant='h5' component='div' fontSize={16}>
  //         Make sure you definitely want to do this - your account cannot be
  //         restored.
  //       </Typography>
  //     </Box>
  //     <Button
  //       variant='contained'
  //       onClick={handleDeleteUser}
  //       sx={{ textTransform: 'capitalize' }}>
  //       Delete account
  //     </Button>
  //   </Box>
  // );

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
                  <ListItemButton component={NavLink} to='/dashboard'>
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
    </Card>
  );
};

export default UserProfile;
