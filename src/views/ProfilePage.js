import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserProfile from '../components/UserProfile/UserProfile';

const ProfilePage = () => {
  return (
    <Container maxWidth='lg'>
      <Box my={3}>
        <UserProfile />
      </Box>
    </Container>
  );
};

export default ProfilePage;
