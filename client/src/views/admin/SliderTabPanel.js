import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import axios from 'axios';
import { createRef, uploadImage, downloadImage } from '../../lib/storage';
import { verifyImage } from '../../lib/file-type';

const SliderTabPanel = (props) => {
  const { value, index, open, handleOpen, ...other } = props;
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const handleUpload = async (e) => {
    try {
      const imageFile = e.target.files[0];
      const status = await verifyImage(imageFile);

      console.log(status);
      if (status !== 'Ok' || !imageFile) {
        setMessage('Please upload a photo with the proper format!');
        setSeverity('error');
        handleOpen(true);

        return;
      }

      setImage(imageFile);
      e.target.value = '';
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setDescription('');
    setImage(null);
    setName('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        setMessage('Please upload an image!');
        setSeverity('error');
        handleOpen(true);

        return;
      }

      const sliderImagesRef = createRef(`sliderImages/slider_${index + 1}`);

      if (image instanceof File) await uploadImage(sliderImagesRef, image);
      const imageUrl = await downloadImage(sliderImagesRef);

      const data = {
        description,
        image: imageUrl,
        name,
      };

      await axios.post(`http://localhost:8000/api/slider/${index}`, data);
    } catch (err) {
      console.log(err);
    }
    setMessage('Successfully changed slider!');
    setSeverity('success');
    handleOpen(true);
    setDescription('');
    setImage(null);
    setName('');
  };

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`slider-tabpanel-${index}`}
      aria-labelledby={`slider-tab-${index}`}
      {...other}>
      {value === index && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
          <Box display='flex' flexDirection='column' gap={1}>
            <Title>Slider image</Title>
            {image?.name && (
              <Box
                component='img'
                src={image?.photo ? image?.photo : URL?.createObjectURL(image)}
                alt={image?.name}
                sx={{
                  objectFit: 'cover',
                  width: '50%',
                  alignSelf: 'center',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
            )}
            <Button
              id='upload-image'
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
              <Typography>Currently uploaded photo:</Typography>
              <Typography color='GrayText'>
                {image?.name ? image?.name : 'none'}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Title>Slider name</Title>
            <TextField
              id='set-name'
              label='Write slider name'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Title>Slider description</Title>
            <TextField
              id='set-description'
              label='Write slider description'
              variant='outlined'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <ActionButtons
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
          />
          <AlertInfo
            open={open}
            handleOpen={handleOpen}
            severity={severity}
            message={message}
          />
        </Box>
      )}
    </div>
  );
};

export default SliderTabPanel;
