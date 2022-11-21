import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title.js';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <>
      <Title>Recent Deposits</Title>
      <Typography component='p' variant='h4'>
        $3,024.00
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link
          component={NavLink}
          color='primary'
          to='#'
          onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
}
