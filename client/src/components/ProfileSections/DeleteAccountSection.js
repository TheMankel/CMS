import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { deleteImage } from '../../lib/storage';
import { useAuth } from '../../contexts/authContext';

const DeleteAccountSection = (props) => {
  const { userImagesRef } = props;
  const { user, deleteUserHandler } = useAuth();

  const handleDeleteUser = async () => {
    try {
      const { uid } = user;

      const res = await axios.post('http://localhost:8000/api/delete-user', {
        uid,
      });

      if (res.status !== 200) return;

      if (user.photoURL) deleteImage(userImagesRef);

      deleteUserHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Typography gutterBottom variant='h4' component='div' fontSize={24}>
        Delete account
      </Typography>
      <Box my={2}>
        <Typography my={1} variant='h5' component='div' fontSize={16}>
          Are you sure you want to delete your account?
        </Typography>
        <Typography my={1} variant='h5' component='div' fontSize={16}>
          If you click on this button, you will delete your account in our blog.
          You will be automatically log out and not able to access your account
          anymore.
        </Typography>
        <Typography my={1} variant='h5' component='div' fontSize={16}>
          Make sure you definitely want to do this - your account cannot be
          restored.
        </Typography>
      </Box>
      <Button
        variant='contained'
        onClick={handleDeleteUser}
        sx={{ textTransform: 'capitalize' }}>
        Delete account
      </Button>
    </Box>
  );
};

export default DeleteAccountSection;
