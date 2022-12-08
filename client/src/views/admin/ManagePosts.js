import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../components/Copyright/Copyright.js';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Title from './Title';

const ManagePosts = () => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      // [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const handleNewPost = () => {
    console.log(value);
  };

  const handleDeletePost = () => {
    console.log(value);
  };

  const handleEditPost = () => {
    console.log(value);
  };

  // Generate Order Data
  function createData(id, created, postTitle) {
    return { id, created, postTitle };
  }

  const rows = [
    createData(0, '16 Mar, 2019', 'Post test'),
    createData(1, '16 Mar, 2019', 'Post 1'),
    createData(2, '16 Mar, 2019', 'Post 2'),
    createData(3, '16 Mar, 2019', 'Post 3'),
    createData(4, '15 Mar, 2019', 'Post 4'),
  ];

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
              <ReactQuill
                theme='snow'
                value={value}
                onChange={setValue}
                placeholder='Write something'
                modules={modules}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleNewPost}>Add new post</Button>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>Post title</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((user, i) => (
                      <TableRow key={i}>
                        <TableCell>{i}</TableCell>
                        <TableCell>{user?.postTitle}</TableCell>
                        <TableCell>{user?.created}</TableCell>
                        <TableCell align='center'>
                          <IconButton
                            onClick={handleEditPost}
                            aria-label='edit post'
                            component='label'>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={handleDeletePost}
                            aria-label='delete post'
                            component='label'>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default ManagePosts;
