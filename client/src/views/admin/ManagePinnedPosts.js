import React, { useState, useEffect, useCallback } from 'react';
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
import axios from 'axios';
import { getData } from '../../lib/api';

const PinnedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [firstPost, setFirstPost] = useState('');
  const [secondPost, setSecondPost] = useState('');

  const handleCancel = () => {
    setFirstPost('');
    setSecondPost('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!firstPost || !secondPost) return;

      const data = {
        firstPost,
        secondPost,
      };

      await axios.post('http://localhost:8000/api/update-pinned-posts', data);
    } catch (err) {
      console.log(err);
    }
    setFirstPost('');
    setSecondPost('');
  };

  // const getData = useCallback(async () => {
  //   try {
  //     const data = await axios.get('http://localhost:8000/api/posts');

  //     const postsData = data?.data?.posts;

  //     if (!postsData) return;

  //     setPosts(postsData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  useEffect(() => {
    getData('posts', setPosts);
  }, []);

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
                <Title>First pinned post</Title>
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
                    <MenuItem value='none'>
                      <em>None</em>
                    </MenuItem>
                    {posts.map((post) => (
                      <MenuItem key={post.title} value={post.title}>
                        {post.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Title>Second pinned post</Title>
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
                    <MenuItem value='none'>
                      <em>None</em>
                    </MenuItem>
                    {posts.map((post) => (
                      <MenuItem key={post.title} value={post.title}>
                        {post.title}
                      </MenuItem>
                    ))}
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
                  Save
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
