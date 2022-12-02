import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title.js';

function preventDefault(event) {
  event.preventDefault();
}

const AccountNumber = () => {
  return (
    <>
      <Title>Number of created accounts</Title>
      <Typography component='p' variant='h4'>
        69
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
    </>
  );
};

export default AccountNumber;
