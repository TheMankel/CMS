import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../components/Copyright/Copyright.js';
import { Button } from '@mui/material';

const ManagePosts = () => {
  const [value, setValue] = useState('');

  const handleNewPost = () => {
    console.log(value);
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
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Title
          </Grid>
          <Grid item xs={12}>
            Background photo
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <ReactQuill theme='snow' value={value} onChange={setValue} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleNewPost}>Add new post</Button>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default ManagePosts;
