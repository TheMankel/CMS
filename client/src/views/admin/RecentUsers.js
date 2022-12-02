import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, userName) {
  return { id, date, userName };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley'),
  createData(1, '16 Mar, 2019', 'Paul McCartney'),
  createData(2, '16 Mar, 2019', 'Tom Scholz'),
  createData(3, '16 Mar, 2019', 'Michael Jackson'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen'),
];

function preventDefault(e) {
  e.preventDefault();
}

const RecentUsers = () => {
  return (
    <>
      <Title>Recent users</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sign up date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RecentUsers;
