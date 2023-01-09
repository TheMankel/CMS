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
import TextField from '@mui/material/TextField';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
import axios from 'axios';

const ManageSocials = () => {
  const [socialName, setSocialName] = useState('none');
  const [socialURL, setSocialURL] = useState('');
  const socials = ['Github', 'Twitter', 'Facebook', 'Instagram'];

  const handleCancel = () => {
    setSocialName('none');
    setSocialURL('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (socialName === 'none') return;

      console.log(socialURL);

      const data = {
        name: socialName,
        url: socialURL,
      };

      await axios.post('http://localhost:8000/api/update-socials', data);
    } catch (err) {
      console.log(err);
    }
    setSocialName('none');
    setSocialURL('');
  };

  return (
    // <Box
    //   component='main'
    //   sx={{
    //     backgroundColor: (theme) =>
    //       theme.palette.mode === 'light'
    //         ? theme.palette.grey[100]
    //         : theme.palette.grey[900],
    //     flexGrow: 1,
    //     height: '100vh',
    //     overflow: 'auto',
    //   }}>
    //   <Toolbar />
    //   <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
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
            <Title>Choose social</Title>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Social name</InputLabel>
              <Select
                labelId='select-social-name'
                id='social-name'
                value={socialName}
                label='Social name'
                onChange={(e) => setSocialName(e.target.value)}>
                <MenuItem value='none'>
                  <em>None</em>
                </MenuItem>
                {socials.map((social) => (
                  <MenuItem key={social} value={social}>
                    {social}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Title>Provide link</Title>
            <FormControl fullWidth>
              <TextField
                id='social-url'
                label='Social link'
                value={socialURL}
                onChange={(e) => setSocialURL(e.target.value)}
              />
            </FormControl>
          </Box>
          <ActionButtons
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
          />
        </Paper>
      </Grid>
    </Grid>
    //   </Container>
    // </Box>
  );
};

export default ManageSocials;
