import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import Title from './Title';

const RecentUsers = (props) => {
  const { recentUsers, isLoading } = props;

  return (
    <>
      <Title>Recent users</Title>
      {isLoading && (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>lp</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Sign up date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(4)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>{<Skeleton variant='text' />}</TableCell>
                <TableCell>{<Skeleton variant='text' />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {recentUsers.length === 0 && !isLoading && (
        <Box display='flex' flexDirection='column' alignItems='center' gap={1}>
          <InfoIcon sx={{ fontSize: '57.6px' }} />
          <Typography component='h1' variant='h5'>
            No new users!
          </Typography>
        </Box>
      )}
      {recentUsers.length > 0 && !isLoading && (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>lp</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Sign up date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentUsers.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>{user?.fullName}</TableCell>
                <TableCell>{user?.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default RecentUsers;
