import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title.js';

function preventDefault(e) {
  e.preventDefault();
}

const PostNumber = () => {
  return (
    <>
      <Title>Number of posts</Title>
      <Typography component='p' variant='h4'>
        420
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
    </>
  );
};

export default PostNumber;
