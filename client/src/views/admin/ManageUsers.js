import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Copyright from '../../components/Copyright/Copyright.js';
import Title from './Title';

// Generate Order Data
function createData(id, created, fullName) {
  return { id, created, fullName };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley'),
  createData(1, '16 Mar, 2019', 'Paul McCartney'),
  createData(2, '16 Mar, 2019', 'Tom Scholz'),
  createData(3, '16 Mar, 2019', 'Michael Jackson'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen'),
];

const ManageUsers = (props) => {
  const { title } = props;
  return (
    <Box
      component='main'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>{title}</Title>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>lp</TableCell>
                    <TableCell>Full name</TableCell>
                    <TableCell>Sign up date</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((user, i) => (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>{user?.fullName}</TableCell>
                      <TableCell>{user?.created}</TableCell>
                      <TableCell>
                        <IconButton aria-label='delete user' component='label'>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default ManageUsers;
