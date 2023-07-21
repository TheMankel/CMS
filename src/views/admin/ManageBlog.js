import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import axios from 'axios';
import { createRef, uploadImage, downloadImage } from '../../lib/storage';
import { verifyImage } from '../../lib/file-type';

const ManageBlog = () => {
  const [blogName, setBlogName] = useState('');
  const [logo, setLogo] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const handleUpload = async (e) => {
    try {
      const logoFile = e.target.files[0];
      const status = await verifyImage(logoFile);

      console.log(status);
      if (status !== 'Ok' || !logoFile) {
        setMessage('Please upload a photo with the proper format!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      setLogo(logoFile);
      e.target.value = '';
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setBlogName('');
    setLogo(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!logo || !blogName) {
      setMessage('Please provide all data!');
      setSeverity('error');
      setOpen(true);

      return;
    }

    try {
      const blogLogoRef = createRef('logoImages/logo');

      await uploadImage(blogLogoRef, logo);
      const logoUrl = await downloadImage(blogLogoRef);

      const data = {
        title: blogName,
        logo: logoUrl,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/update-blog`, data, {
        withCredentials: true,
      });

      const link = document.querySelector("link[rel~='icon']");

      document.title = blogName;
      link.href = logoUrl;
    } catch (err) {
      console.log(err);
    }
    setMessage('Successfully changed blog data!');
    setSeverity('success');
    setOpen(true);
    setBlogName('');
    setLogo(null);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Title>Blog name</Title>
            <TextField
              id='set-blogName'
              label='Write new blog name'
              variant='outlined'
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Box display='flex' flexDirection='column' gap={1}>
            <Title>Logo</Title>
            {logo?.name && (
              <Box
                component='img'
                src={logo?.photo ? logo?.photo : URL?.createObjectURL(logo)}
                alt={logo?.name}
                sx={{
                  objectFit: 'cover',
                  width: '25%',
                  alignSelf: 'center',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
            )}
            <Button
              id='upload-logo'
              variant='contained'
              component='label'
              onChange={handleUpload}
              sx={{
                alignSelf: 'center',
                textTransform: 'none',
              }}>
              Upload
              <input hidden accept='image/*' type='file' />
            </Button>
            <Box display='flex' gap={1}>
              <Typography>Currently uploaded logo:</Typography>
              <Typography color='GrayText'>
                {logo?.name ? logo.name : 'none'}
              </Typography>
            </Box>
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

export default ManageBlog;
