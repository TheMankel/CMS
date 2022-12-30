import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

const AboutTabPanel = (props) => {
  const { value, index, ...other } = props;
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

  const handleCancel = () => {
    setPrimary('');
    setSecondary('');
  };

  const handleUpdate = async (e) => {
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
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`about-tabpanel-${index}`}
      aria-labelledby={`about-tab-${index}`}
      {...other}>
      {value === 0 && (
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
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
          />
        </Grid>
      )}
      {value === 1 && (
        <Grid item xs={12}>
          <Grid
            component='form'
            noValidate
            autoComplete='off'
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
            <Box>
              <Title>Name</Title>
              <TextField
                id='set-title'
                label='Write your name'
                variant='outlined'
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>
            <Box>
              <Title>Title</Title>
              <TextField
                id='set-description'
                label='Write your job title'
                variant='outlined'
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>
            <Box display='flex' flexDirection='column' gap={1}>
              <Title>Avatar</Title>
              <Box
                component='img'
                sx={{
                  objectFit: 'cover',
                  width: '50%',
                  alignSelf: 'center',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <Button
                id='upload-background'
                variant='contained'
                component='label'
                sx={{
                  alignSelf: 'center',
                  textTransform: 'none',
                }}>
                Upload
                <input hidden accept='image/*' type='file' />
              </Button>
              <Box display='flex' gap={1}>
                <Typography>Currently uploaded photo:</Typography>
                <Typography color='GrayText'></Typography>
              </Box>
            </Box>
            <Title>About</Title>
            <TextField
              id='set-secondary'
              label='Write about yourself'
              variant='outlined'
              fullWidth
              sx={{ mt: 1 }}
            />
            <ActionButtons />
          </Grid>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Team</Title>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name</TableCell>
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
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AboutTabPanel;
