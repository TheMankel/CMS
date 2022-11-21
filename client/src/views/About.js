import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Story from '../components/Story/Story';
import Team from '../components/Team/Team';
// import MainPublic from '../layouts/MainPublic';

const About = () => {
  return (
    <>
      <Box my={3}>
        <Story />
      </Box>
      <Divider />
      <Box my={3}>
        <Team />
      </Box>
    </>
  );
};

export default About;
