import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import axios from 'axios';

const ManageSocials = () => {
  const [socialName, setSocialName] = useState('');
  const [socialURL, setSocialURL] = useState('');
  const socials = ['Github', 'Twitter', 'Facebook', 'Instagram'];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const handleCancel = () => {
    setSocialName('');
    setSocialURL('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!socialName) {
        setMessage('Please choose social to update!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      console.log(socialURL);

      const data = {
        name: socialName,
        url: socialURL,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/update-socials`, data);
    } catch (err) {
      console.log(err);
    }
    setMessage('Successfully saved socials!');
    setSeverity('success');
    setOpen(true);
    setSocialName('');
    setSocialURL('');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Title>Choose social</Title>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id='social-select-label'>Social name</InputLabel>
              <Select
                labelId='social-select-name'
                id='social-name'
                value={socialName}
                label='Social name'
                onChange={(e) => setSocialName(e.target.value)}>
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
            <FormControl fullWidth sx={{ mt: 1 }}>
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
      <AlertInfo
        open={open}
        handleOpen={setOpen}
        severity={severity}
        message={message}
      />
    </Grid>
  );
};

export default ManageSocials;
