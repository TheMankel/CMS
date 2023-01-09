import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
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

  useEffect(() => {
    getData('posts', setPosts);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Title>First pinned post</Title>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id='first-select-label'>First post</InputLabel>
              <Select
                labelId='first-select-label'
                id='first-select'
                value={firstPost}
                label='First post'
                onChange={(e) => setFirstPost(e.target.value)}>
                <MenuItem value='none'>
                  <em>None</em>
                </MenuItem>
                {posts?.map((post) => (
                  <MenuItem key={post?.title} value={post?.title}>
                    {post?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Title>Second pinned post</Title>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id='second-select-label'>Second post</InputLabel>
              <Select
                labelId='second-select-label'
                id='second-select'
                value={secondPost}
                label='Second post'
                onChange={(e) => setSecondPost(e.target.value)}>
                <MenuItem value='none'>
                  <em>None</em>
                </MenuItem>
                {posts?.map((post) => (
                  <MenuItem key={post?.title} value={post?.title}>
                    {post?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <ActionButtons
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PinnedPosts;
