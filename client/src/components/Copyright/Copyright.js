import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = (props) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      padding={2}
      {...props}>
      {'Copyright © '}
      <Link
        // underline='hover'
        underline='none'
        component={NavLink}
        color='inherit'
        to={props.url || '/'}
        sx={{
          '&:hover': {
            opacity: 0.75,
          },
        }}>
        {props.title}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
