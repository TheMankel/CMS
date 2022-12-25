import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ActionButtons = (props) => {
  const {
    firstTitle = 'Cancel',
    secondTitle = 'Save',
    handleCancel,
    handleUpdate,
  } = props;

  return (
    <Box alignSelf='center'>
      <Button
        variant='outlined'
        onClick={handleCancel}
        sx={{
          mx: '4px',
          textTransform: 'none',
        }}>
        {firstTitle}
      </Button>
      <Button
        variant='contained'
        type='submit'
        onClick={handleUpdate}
        sx={{
          mx: '4px',
          textTransform: 'none',
        }}>
        {secondTitle}
      </Button>
    </Box>
  );
};

export default ActionButtons;
