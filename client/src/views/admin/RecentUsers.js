import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

const RecentUsers = (props) => {
  const { recentUsers } = props;

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
          {recentUsers.map((user, i) => (
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
