import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AboutModal from '../AboutModal/AboutModal';
import { useAuth } from '../../contexts/authContext';

const AboutSection = (props) => {
  const { handleUserName } = props;
  const {
    user,
    updateUserFullName,
    updateUserEmail,
    updateUserPassword,
    reauthenticateUser,
  } = useAuth();
  const [selectedInfoIndex, setSelectedInfoIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const handleSelectModal = (i) => {
    setSelectedInfoIndex(i);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedInfoIndex(-1);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    const formRef = new FormData(e.currentTarget);

    if (type === 'user') {
      const data = {
        firstName: formRef.get('firstName'),
        lastName: formRef.get('lastName'),
      };

      console.log(data);
      try {
        if (!data.firstName || !data.lastName) return;

        updateUserFullName(data.firstName, data.lastName);
        handleUserName(data.firstName + ' ' + data.lastName);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (type === 'email') {
      const data = {
        newEmail: formRef.get('newEmail'),
        password: formRef.get('password'),
      };

      console.log(data);

      try {
        if (!data.newEmail || !data.password) return;

        const reAuth = await reauthenticateUser(data.password);
        console.log(reAuth);

        if (reAuth) updateUserEmail(data.newEmail);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (type === 'password') {
      const data = {
        currentPassword: formRef.get('currentPassword'),
        newPassword: formRef.get('newPassword'),
        repeatNewPassword: formRef.get('repeatNewPassword'),
      };

      console.log(data);

      try {
        if (
          !data.currentPassword ||
          !data.newPassword ||
          !data.repeatNewPassword
        )
          return;

        if (data.newPassword !== data.repeatNewPassword) return;

        const reAuth = await reauthenticateUser(data.currentPassword);
        console.log(reAuth);

        if (reAuth) updateUserPassword(data.newPassword);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const userData = [
    {
      id: 'firstName',
      name: 'firstName',
      label: 'First name',
      defaultValue: user?.displayName.split(' ')[0],
      disabled: false,
      required: false,
      type: 'text',
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'Last name',
      defaultValue: user?.displayName.split(' ')[1],
      disabled: false,
      required: false,
      type: 'text',
    },
  ];

  const emailAddressData = [
    {
      id: 'currentEmail',
      name: 'currentEmail',
      label: 'Current email',
      defaultValue: user?.email,
      disabled: true,
      required: false,
      type: 'email',
    },
    {
      id: 'newEmail',
      name: 'newEmail',
      label: 'New email',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'email',
    },
    {
      id: 'password',
      name: 'password',
      label: 'Confirm with password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
  ];

  const passwordData = [
    {
      id: 'currentPassword',
      name: 'currentPassword',
      label: 'Current password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
    {
      id: 'newPassword',
      name: 'newPassword',
      label: 'New password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
    {
      id: 'repeatNewPassword',
      name: 'repeatNewPassword',
      label: 'Repeat new password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
  ];

  return (
    <Box>
      <Typography gutterBottom variant='h4' component='div' fontSize={24}>
        User info
      </Typography>
      <Box my={2}>
        <Typography gutterBottom variant='h5' component='div' fontSize={16}>
          Your details
        </Typography>
        <Box
          border={1}
          borderRadius={2}
          borderColor='#dddddd'
          padding={2}
          minHeight={50}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant='h6' component='div' fontSize={14}>
            {user?.displayName}
          </Typography>
          <Button
            onClick={() => {
              handleOpen();
              handleSelectModal(0);
            }}
            sx={{ textTransform: 'capitalize', padding: 0 }}>
            Change
          </Button>
        </Box>
      </Box>
      <Box my={2}>
        <Typography gutterBottom variant='h5' component='div' fontSize={16}>
          Email address
        </Typography>
        <Box
          border={1}
          borderRadius={2}
          borderColor='#dddddd'
          padding={2}
          minHeight={50}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant='h6' component='div' fontSize={14}>
            {user?.email}
          </Typography>
          <Button
            onClick={() => {
              handleOpen();
              handleSelectModal(1);
            }}
            sx={{ textTransform: 'capitalize', padding: 0 }}>
            Change
          </Button>
        </Box>
      </Box>
      <Box my={2}>
        <Typography gutterBottom variant='h5' component='div' fontSize={16}>
          Password
        </Typography>
        <Box
          border={1}
          borderRadius={2}
          borderColor='#dddddd'
          padding={2}
          minHeight={50}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant='h6' component='div'>
            ••••••••
          </Typography>
          <Button
            onClick={() => {
              handleOpen();
              handleSelectModal(2);
            }}
            sx={{ textTransform: 'capitalize', padding: 0 }}>
            Change
          </Button>
        </Box>
      </Box>
      <AboutModal
        open={open && selectedInfoIndex === 0}
        handleClose={handleClose}
        title='Your data'
        data={userData}
        handleSubmit={(e) => handleSubmit(e, 'user')}
      />
      <AboutModal
        open={open && selectedInfoIndex === 1}
        handleClose={handleClose}
        title='Change e-mail address'
        data={emailAddressData}
        handleSubmit={(e) => handleSubmit(e, 'email')}
      />
      <AboutModal
        open={open && selectedInfoIndex === 2}
        handleClose={handleClose}
        title='Change password'
        data={passwordData}
        handleSubmit={(e) => handleSubmit(e, 'password')}
      />
    </Box>
  );
};

export default AboutSection;
