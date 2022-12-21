import React, { useState, useEffect, useCallback } from 'react';
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
import Title from './Title';
import { useAuth } from '../../contexts/authContext';
import axios from 'axios';

// Generate Order Data
// function createData(id, created, fullName) {
//   return { id, created, fullName };
// }

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley'),
//   createData(1, '16 Mar, 2019', 'Paul McCartney'),
//   createData(2, '16 Mar, 2019', 'Tom Scholz'),
//   createData(3, '16 Mar, 2019', 'Michael Jackson'),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen'),
// ];

const ManageUsers = (props) => {
  const { title } = props;
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const handleDelete = async (e) => {
    try {
      const id = e.currentTarget?.id;

      await axios.get(`http://localhost:8000/api/delete-user/${id}`);
    } catch (err) {
      console.log(err);
    }
    getData();
  };

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/users/${user?.uid}`,
      );

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

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
                  {users?.map((user, i) => (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>{user?.fullName}</TableCell>
                      <TableCell>{user?.created}</TableCell>
                      <TableCell>
                        <IconButton
                          id={user?.uid}
                          aria-label='delete user'
                          component='label'
                          onClick={handleDelete}>
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
      </Container>
    </Box>
  );
};

export default ManageUsers;
