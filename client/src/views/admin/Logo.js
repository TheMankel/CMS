import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Title from './Title.js';

const Logo = () => {
  return (
    <>
      <Title>Logo</Title>
      <Box
        component='img'
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt='The house from the offer.'
        src='https://cdn.dribbble.com/userupload/2809047/file/original-ed09e09a4ebf5967408129c7aff2759c.jpg?compress=1&resize=400x300&vertical=top'
      />
    </>
  );
};

export default Logo;
