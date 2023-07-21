import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Title from '../../components/Title/Title';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import axios from 'axios';

const StoryTabPanel = () => {
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const handleCancelStory = () => {
    setPrimary('');
    setSecondary('');
  };

  const handleUpdateStory = async (e) => {
    e.preventDefault();

    if (!primary || !secondary) {
      setMessage('Please provide all story data!');
      setSeverity('error');
      setOpen(true);

      return;
    }

    try {
      const data = {
        primary: primary,
        secondary: secondary,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/update-about-story`,
        data,
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
    setMessage('Successfully saved a story!');
    setSeverity('success');
    setOpen(true);
    setPrimary('');
    setSecondary('');
  };

  return (
    <Grid
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}>
      <Box>
        <Title>Primary story</Title>
        <TextField
          id='set-primary'
          label='Write your main story'
          variant='outlined'
          value={primary}
          onChange={(e) => setPrimary(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
      </Box>
      <Box>
        <Title>Secondary story</Title>
        <TextField
          id='set-secondary'
          label='Write your secondary story'
          variant='outlined'
          value={secondary}
          onChange={(e) => setSecondary(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
        />
      </Box>
      <ActionButtons
        handleCancel={handleCancelStory}
        handleUpdate={handleUpdateStory}
      />
      <AlertInfo
        open={open}
        handleOpen={setOpen}
        severity={severity}
        message={message}
      />
    </Grid>
  );
};

export default StoryTabPanel;
