import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Title from './Title';
import axios from 'axios';

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');

  const handleCancel = () => {
    setContent('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!content) return;

    try {
      const data = {
        content: content,
      };

      await axios.post('http://localhost:8000/api/update-policy', data, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
    setContent('');
  };

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
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box>
                <Title>Edit Privacy Policy</Title>
              </Box>
              <ReactQuill
                theme='snow'
                value={content}
                onChange={setContent}
                placeholder='Write something'
              />
              <Box alignSelf='center'>
                <Button
                  variant='outlined'
                  onClick={handleCancel}
                  sx={{
                    mx: '4px',
                    textTransform: 'none',
                  }}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={handleUpdate}
                  sx={{
                    mx: '4px',
                    textTransform: 'none',
                  }}>
                  Update
                </Button>
              </Box>
              <Box>
                <Title>Preview the current privacy policy</Title>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
