import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
import axios from 'axios';
import { createRef, uploadImage, downloadImage } from '../../lib/storage';
import { verifyImage } from '../../lib/file-type';

const ManageBlog = () => {
  const [blogName, setBlogName] = useState('');
  const [logo, setLogo] = useState(null);

  const handleUpload = async (e) => {
    try {
      const logoFile = e.target.files[0];
      const status = await verifyImage(logoFile);

      console.log(status);
      if (status !== 'Ok' || !logoFile) return;

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

    if (!logo || !blogName) return;

    try {
      const blogLogoRef = createRef('logoImages/logo');

      await uploadImage(blogLogoRef, logo);
      const logoUrl = await downloadImage(blogLogoRef);

      const data = {
        title: blogName,
        logo: logoUrl,
      };

      await axios.post('http://localhost:8000/api/update-blog', data, {
        withCredentials: true,
      });

      const link = document.querySelector("link[rel~='icon']");

      document.title = blogName;
      link.href = logoUrl;
    } catch (err) {
      console.log(err);
    }
    setBlogName('');
    setLogo(null);
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
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
          <Box display='flex' flexDirection='column' sx={{ mt: 2 }}>
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
            <Box display='flex' gap={1} sx={{ mt: 1 }}>
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
    </Grid>
    //   </Container>
    // </Box>
  );
};

export default ManageBlog;
