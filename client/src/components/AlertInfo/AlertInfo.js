import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AlertInfo = (props) => {
  const { open, errorMessage, successMessage, handleClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={errorMessage ? 'error' : 'success'}
        sx={{ width: '100%' }}>
        {errorMessage ? errorMessage : successMessage}
      </Alert>
    </Snackbar>
  );
};

export default AlertInfo;
