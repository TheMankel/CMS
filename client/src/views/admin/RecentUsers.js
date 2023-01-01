import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Title from './Title';

const RecentUsers = (props) => {
  const { recentUsers, isLoading } = props;

  return (
    <>
      <Title>Recent users</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>lp</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Sign up date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading &&
            [...Array(4)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>{<Skeleton variant='text' />}</TableCell>
                <TableCell>{<Skeleton variant='text' />}</TableCell>
              </TableRow>
            ))}
          {!isLoading &&
            recentUsers.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>{user?.fullName}</TableCell>
                <TableCell>{user?.created}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RecentUsers;
