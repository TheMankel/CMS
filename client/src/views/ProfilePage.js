import * as React from 'react';
// import Box from "@mui/material/Box";
import UserProfile from '../components/UserProfile/UserProfile';
import MainPublic from '../layouts/MainPublic';

const ProfilePage = () => {
  return (
    <MainPublic>
      <UserProfile />
    </MainPublic>
  );
};

export default ProfilePage;
