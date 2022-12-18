import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Title from './Title';

const PinnedPosts = () => {
  const [firstPost, setFirstPost] = useState('');
  const [secondPost, setSecondPost] = useState('');

  const handleCancel = () => {
    setFirstPost('');
    setSecondPost('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
    } catch (err) {
      console.log(err);
    }
    setFirstPost('');
    setSecondPost('');
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
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
              <Box>
                <Title>First featured post</Title>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    First post
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={firstPost}
                    label='First post'
                    onChange={(e) => setFirstPost(e.target.value)}>
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Title>Second featured post</Title>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Second post
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={secondPost}
                    label='Second post'
                    onChange={(e) => setSecondPost(e.target.value)}>
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PinnedPosts;
