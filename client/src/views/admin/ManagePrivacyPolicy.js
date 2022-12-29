import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionButtons from './ActionButtons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
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
                <Title>Add rule title</Title>
                <TextField
                  id='set-chapterTitle'
                  label='Write new chapter title'
                  variant='outlined'
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box>
                <Title>Rule content</Title>
              </Box>
              <ReactQuill theme='snow' placeholder='Write rule content' />
              <ActionButtons
                handleCancel={handleCancel}
                handleUpdate={handleUpdate}
              />
            </Paper>
            <Grid item xs={12} mt={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Title>Privacy Policy rules</Title>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>Rules</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align='center'>
                        <IconButton aria-label='edit post' component='label'>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label='delete post' component='label'>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
