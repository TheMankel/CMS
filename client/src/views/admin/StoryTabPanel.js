import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Title from '../../components/Title/Title';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import axios from 'axios';

const StoryTabPanel = () => {
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

  const handleCancelStory = () => {
    setPrimary('');
    setSecondary('');
  };

  const handleUpdateStory = async (e) => {
    e.preventDefault();

    if (!primary || !secondary) return;

    try {
      const data = {
        primary: primary,
        secondary: secondary,
      };

      await axios.post('http://localhost:8000/api/update-about-story', data, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
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
    </Grid>
  );
};

export default StoryTabPanel;
