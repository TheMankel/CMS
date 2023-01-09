import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import Skeleton from '@mui/material/Skeleton';
import Title from '../../components/Title/Title';
import Info from '../../components/Info/Info';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import { getData } from '../../lib/api';
import { createRef, getListImages, deleteImage } from '../../lib/storage';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const handleUpdate = async (e) => {
    try {
      const id = e.currentTarget?.id;

      if (!id) {
        setMessage("Could not change user's role. Try again later!");
        setSeverity('error');
        setOpen(true);

        return;
      }

      const data = users.find((user) => user.uid === id);

      await axios.post(`http://localhost:8000/api/update-user/${id}`, data);
    } catch (err) {
      console.log(err);
    }
    setMessage("Successfully changed user's role!");
    setSeverity('success');
    setOpen(true);
    // getData();
    getData(`users/${user?.uid}`, setUsers);
  };

  const handleDelete = async (e) => {
    try {
      const id = e.currentTarget?.id;

      if (!id) {
        setMessage('Could not delete user. Try again later!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      const res = await axios.get(
        `http://localhost:8000/api/delete-user/${id}`,
      );

      if (res.status !== 200) {
        setMessage('Something went wrong. Try again later!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      const allUserImagesRef = createRef(`userImages`);
      const userRef = createRef(`userImages/${id}`);
      const uploadedImages = await getListImages(allUserImagesRef);
      const imageExists = uploadedImages.some((image) => image.name === id);

      if (imageExists) deleteImage(userRef);
    } catch (err) {
      console.log(err);
    }
    setMessage('Successfully deleted user!');
    setSeverity('success');
    setOpen(true);
    // getData();
    getData(`users/${user?.uid}`, setUsers);
  };

  useEffect(() => {
    getData(`users/${user?.uid}`, setUsers, setIsLoading);
  }, [user]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>All users</Title>
          {isLoading && (
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
                {[...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {users.length === 0 && !isLoading && (
            <Info message='No registered users!' />
          )}
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
                {users?.map((user, i) => (
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
      <AlertInfo
        open={open}
        handleOpen={setOpen}
        severity={severity}
        message={message}
      />
    </Grid>
  );
};

export default ManageUsers;
