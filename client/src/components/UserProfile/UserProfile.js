import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
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
import LogoutIcon from '@mui/icons-material/Logout';

const UserProfile = () => {
  const user = {
    name: 'Jankos Jankoski',
    avatar:
      'https://play-lh.googleusercontent.com/O8mvDQlw4AwmGfUrh4lviZD_PwwhRHz2etA25F77SbXrm3qEHOt2826aNkKar4D0yw',
    about:
      'I am an ambitious workaholic, but apart from that, pretty simple person.',
  };

  return (
    <Container maxWidth='lg'>
      <Box my={3}>
        <Grid container>
          <Grid item xs={12} sm={4} p={2}>
            <Card>
              <CardContent>
                <Box align={'center'}>
                  <Avatar
                    alt='User Avatar'
                    src={user?.avatar}
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
                <Box mt={2} px={2} align={'center'}>
                  <Typography variant='h6' component='div'>
                    {user.name}
                  </Typography>
                  <Typography
                    variant={'subtitle2'}
                    component='div'
                    color={'textSecondary'}>
                    {user?.about}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} p={2}>
            <Card>
              <CardContent>
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
                  E-Mail
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} p={2}>
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
          </Grid>
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
      </Box>
    </Container>
  );
};

export default UserProfile;
