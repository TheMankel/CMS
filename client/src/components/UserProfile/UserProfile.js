import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
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

const UserProfile = () => {
  const { user, role, signOutHandler } = useAuth();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (e, i) => {
    setSelectedIndex(i);
  };

  const signOut = () => {
    signOutHandler();
    navigate('/');
  };

  const About = (
    <Box>
      <Typography gutterBottom variant='h5' component='div'>
        User Info
      </Typography>
      <Divider />
      <Typography gutterBottom variant='h6' component='div'>
        First Name
      </Typography>
      <Divider />
      <Typography gutterBottom variant='h6' component='div'>
        Last Name
      </Typography>
      <Divider />
      <Typography gutterBottom variant='h6' component='div'>
        E-Mail
      </Typography>
      <Divider />
      <Typography gutterBottom variant='h6' component='div'>
        Password
      </Typography>
    </Box>
  );

  const ChangeAvatar = <Box>ChangeAvatar</Box>;

  const DeleteAccount = <Box>DeleteAccount</Box>;

  return (
    <Container maxWidth='lg'>
      <Box my={3}>
        <Card>
          <Grid container>
            <Grid item xs={12} sm={4} p={2}>
              <Box align={'center'}>
                <Avatar
                  alt='User Avatar'
                  src={user?.photoURL}
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
                {/* <Typography
                  variant={'subtitle2'}
                  component='div'
                  color={'textSecondary'}>
                  {user?.about}
                </Typography> */}
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
                    <ListItemButton
                      selected={selectedIndex === 1}
                      onClick={(e) => handleListItemClick(e, 1)}>
                      <ListItemIcon>
                        <PhotoCameraIcon />
                      </ListItemIcon>
                      <ListItemText primary='Change Avatar' />
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
                      <ListItemButton component={NavLink} to='dashboard'>
                        <ListItemIcon>
                          <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary='Admin dashboard' />
                      </ListItemButton>
                    </ListItem>
                  )}
                  <ListItem disablePadding>
                    <ListItemButton onClick={signOut}>
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
                {selectedIndex === 1 && ChangeAvatar}
                {selectedIndex === 2 && DeleteAccount}
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={4} p={2}>
              <Card>
                <CardContent
                  sx={{
                    padding: 0,
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}>
                  <List disablePadding>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary='About' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PhotoCameraIcon />
                        </ListItemIcon>
                        <ListItemText primary='Change Avatar' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary='Delete account' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid> */}
            {/* <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant='h3' component='div'>
                  Lizard
                </Typography>
                <Divider />
                <Typography gutterBottom variant='h5' component='div'>
                  Lizard
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                  Lizard
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='medium'>BUTTON</Button>
                <Button size='medium'>BUTTON2</Button>
              </CardActions>
            </Card>
          </Grid> */}
            {/* <Grid item xs={4}>
            <Card>
              <CardMedia
                component='img'
                alt='green iguana'
                height='140'
                image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Lizard
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Share</Button>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid> */}
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default UserProfile;
