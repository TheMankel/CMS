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
import Switch from '@mui/material/Switch';
import Skeleton from '@mui/material/Skeleton';
import Title from '../../components/Title/Title';
import Info from '../../components/Info/Info';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import { getData } from '../../lib/api';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = async (e) => {
    try {
      const id = e.currentTarget?.id;
      const data = users.find((user) => user.uid === id);

      await axios.post(`http://localhost:8000/api/update-user/${id}`, data);
    } catch (err) {
      console.log(err);
    }
    // getData();
    getData(`users/${user?.uid}`, setUsers);
  };

  const handleDelete = async (e) => {
    try {
      const id = e.currentTarget?.id;

      await axios.get(`http://localhost:8000/api/delete-user/${id}`);
    } catch (err) {
      console.log(err);
    }
    // getData();
    getData(`users/${user?.uid}`, setUsers);
  };

  // const getData = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:8000/api/users/${user?.uid}`,
  //     );

  //     setUsers(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  useEffect(() => {
    getData(`users/${user?.uid}`, setUsers, setIsLoading);
  }, [user]);

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
              <Title>All users</Title>
              {users.length === 0 && <Info message='No registered users!' />}
              {users.length > 0 && (
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>lp</TableCell>
                      <TableCell>Full name</TableCell>
                      <TableCell>Sign up date</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isLoading &&
                      [...Array(4)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>{i}</TableCell>
                          <TableCell>{<Skeleton variant='text' />}</TableCell>
                          <TableCell>{<Skeleton variant='text' />}</TableCell>
                          <TableCell>{<Skeleton variant='text' />}</TableCell>
                          <TableCell>{<Skeleton variant='text' />}</TableCell>
                        </TableRow>
                      ))}
                    {!isLoading &&
                      users?.map((user, i) => (
                        <TableRow key={i}>
                          <TableCell>{i}</TableCell>
                          <TableCell>{user?.fullName}</TableCell>
                          <TableCell>{user?.created}</TableCell>
                          <TableCell>
                            {' '}
                            <Switch
                              id={user?.uid}
                              checked={user?.role === 'admin' ? true : false}
                              onChange={handleUpdate}
                              inputProps={{ 'aria-label': 'user role' }}
                            />
                          </TableCell>
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
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ManageUsers;
