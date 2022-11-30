import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

const AboutModal = (props) => {
  const { open, handleClose, handleSubmit, title, data } = props;

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
          }}>
          <Box
            px={2}
            py={1}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              borderRadius: 2,
            }}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              {title}
            </Typography>
            <IconButton
              color='inherit'
              aria-label='close-modal'
              onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            padding={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
            }}>
            {/* <TextField
              disabled
              id='outlined-disabled'
              label='Current e-mail'
              defaultValue={user.email}
              fullWidth
              size='small'
              sx={{ bgcolor: '#f5f5f5' }}
            />
            <TextField
              required
              id='email'
              label='New e-mail'
              type='email'
              fullWidth
              size='small'
            />
            <TextField
              required
              id='password'
              label='Confirm with password'
              type='password'
              autoComplete='current-password'
              fullWidth
              size='small'
            /> */}
            {data?.map((field) => (
              <TextField
                key={field.id}
                disabled={field.disabled}
                required={field.required}
                id={field.id}
                label={field.label}
                type={field.type}
                defaultValue={field.defaultValue}
                fullWidth
                size='small'
                sx={{ bgcolor: `${field.disabled ? '#f5f5f5' : '#ffffff'}` }}
              />
            ))}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onSubmit={handleSubmit}
              sx={{ textTransform: 'capitalize' }}>
              Save
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AboutModal;
