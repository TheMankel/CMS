import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AboutModal from '../AboutModal/AboutModal';

const AboutSection = (props) => {
  const { user } = props;
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

  const userData = [
    {
      id: 'firstname',
      label: 'First name',
      defaultValue: user?.displayName.split(' ')[0],
      disabled: false,
      required: false,
      type: 'text',
    },
    {
      id: 'lastname',
      label: 'Last name',
      defaultValue: user?.displayName.split(' ')[1],
      disabled: false,
      required: false,
      type: 'text',
    },
    {
      id: 'phone-number',
      label: 'Phone number',
      defaultValue: user?.phoneNumber,
      disabled: false,
      required: false,
      type: 'text',
    },
  ];

  const emailAddressData = [
    {
      id: 'current-email',
      label: 'Current email',
      defaultValue: user?.email,
      disabled: true,
      required: false,
      type: 'email',
    },
    {
      id: 'new-email',
      label: 'New email',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'email',
    },
    {
      id: 'password',
      label: 'Confirm with password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
  ];

  const passwordData = [
    {
      id: 'current-password',
      label: 'Current password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
    {
      id: 'new-password',
      label: 'New password',
      defaultValue: '',
      disabled: false,
      required: true,
      type: 'password',
    },
    {
      id: 'repeat-new-password',
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
      />
      <AboutModal
        open={open && selectedInfoIndex === 1}
        handleClose={handleClose}
        title='Change e-mail address'
        data={emailAddressData}
      />
      <AboutModal
        open={open && selectedInfoIndex === 2}
        handleClose={handleClose}
        title='Change password'
        data={passwordData}
      />
    </Box>
  );
};

export default AboutSection;
