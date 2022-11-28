import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/system';
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
import { createRef, uploadImage, downloadImage } from '../../lib/storage';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const UserProfile = () => {
  const { user, role, signOutHandler, updateUserPhoto, deleteUserHandler } =
    useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const userImagesRef = createRef(`userImages/${user?.uid}`);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // useEffect(() => {
  //   if (!image) setImage(user?.photoURL);
  // }, [user, image]);

  useEffect(() => {
    setImage(user?.photoURL);
    console.log(user);
  }, [user]);

  const handleUpload = (e) => {
    try {
      const imageFile = e.target.files[0];
      if (!imageFile) return;

      uploadImage(userImagesRef, imageFile);
      downloadImage(userImagesRef, handleImageChange);
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

  const handleListItemClick = (e, i) => {
    setSelectedIndex(i);
  };

  const handleSignOut = () => {
    signOutHandler();
    navigate('/');
  };

  const handleDeleteUser = async () => {
    try {
      const { uid } = user;

      const res = await axios.post('http://localhost:8000/api/delete-user', {
        uid,
      });

      if (res.status !== 200) return;

      deleteUserHandler();
    } catch (err) {
      console.log(err);
    }
  };

  const About = (
    <Box>
      <Typography gutterBottom variant='h4' component='div' fontSize={24}>
        User info
      </Typography>
      <Box my={2}>
        <Typography gutterBottom variant='h5' component='div' fontSize={16}>
          Your details
        </Typography>
        <Box
          border={1}
          borderRadius={2}
          borderColor='#dddddd'
          padding={2}
          minHeight={50}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant='h6' component='div' fontSize={14}>
            {user.displayName}
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{ textTransform: 'capitalize', padding: 0 }}>
            Change
          </Button>
        </Box>
      </Box>
      <Box my={2}>
        <Typography gutterBottom variant='h5' component='div' fontSize={16}>
          Email address
        </Typography>
        <Box
          border={1}
          borderRadius={2}
          borderColor='#dddddd'
          padding={2}
          minHeight={50}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant='h6' component='div' fontSize={14}>
            {user.email}
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{ textTransform: 'capitalize', padding: 0 }}>
            Change
          </Button>
        </Box>
      </Box>
      <Box my={2}>
        <Typography gutterBottom variant='h5' component='div' fontSize={16}>
          Password
        </Typography>
        <Box
          border={1}
          borderRadius={2}
          borderColor='#dddddd'
          padding={2}
          minHeight={50}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant='h6' component='div'>
            ••••••••
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{ textTransform: 'capitalize', padding: 0 }}>
            Change
          </Button>
        </Box>
      </Box>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 420,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
            }}>
            <Box
              px={2}
              py={1}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
              }}>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'>
                Change e-mail address
              </Typography>
              <IconButton
                color='inherit'
                aria-label='close-modal'
                onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              padding={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3,
              }}>
              <TextField
                disabled
                id='outlined-disabled'
                label='Current e-mail'
                defaultValue={user.email}
                fullWidth
                size='small'
                sx={{ bgcolor: '#f5f5f5' }}
              />
              <TextField
                required
                id='email'
                label='New e-mail'
                type='email'
                fullWidth
                size='small'
              />
              <TextField
                required
                id='password'
                label='Confirm with password'
                type='password'
                autoComplete='current-password'
                fullWidth
                size='small'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                // disabled={loading}
                sx={{ textTransform: 'capitalize' }}>
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );

  const DeleteAccount = (
    <Box>
      <Typography gutterBottom variant='h4' component='div' fontSize={24}>
        Delete account
      </Typography>
      <Box my={2}>
        <Typography my={1} variant='h5' component='div' fontSize={16}>
          Are you sure you want to delete your account?
        </Typography>
        <Typography my={1} variant='h5' component='div' fontSize={16}>
          If you click on this button, you will delete your account in our blog.
          You will be automatically log out and not able to access your account
          anymore.
        </Typography>
        <Typography my={1} variant='h5' component='div' fontSize={16}>
          Make sure you definitely want to do this - your account cannot be
          restored.
        </Typography>
      </Box>
      <Button
        variant='contained'
        onClick={handleDeleteUser}
        sx={{ textTransform: 'capitalize' }}>
        Delete account
      </Button>
    </Box>
  );

  return (
    <Container maxWidth='lg'>
      <Box my={3}>
        <Card>
          <Grid container>
            <Grid item xs={12} sm={4} p={2}>
              <Box align={'center'}>
                <Avatar
                  alt='User Avatar'
                  // src={user?.photoURL}
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
                  {user?.displayName}
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
                      onClick={(e) => handleListItemClick(e, 0)}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary='About' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    {/* <ListItemButton
                      selected={selectedIndex === 1}
                      onClick={(e) => handleListItemClick(e, 1)}>
                      <input hidden accept='image/*' type='file' />

                      <ListItemIcon>
                        <PhotoCameraIcon />
                      </ListItemIcon>
                      <ListItemText primary='Change Avatar' />
                    </ListItemButton> */}
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
                        selected={selectedIndex === 2}
                        onClick={(e) => handleListItemClick(e, 2)}>
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
                {selectedIndex === 0 && About}
                {selectedIndex === 2 && DeleteAccount}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default UserProfile;
