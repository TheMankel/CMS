import React, { useState } from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ActionButtons from './ActionButtons';
import Title from './Title';
import axios from 'axios';
import { createRef, uploadImage, downloadImage } from '../../lib/storage';

const SliderTabPanel = (props) => {
  const { value, index, ...other } = props;
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  const handleUpload = async (e) => {
    console.log(e.target.files[0]);
    try {
      const imageFile = e.target.files[0];
      if (!imageFile) return;

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
      if (!image) return;

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
    setDescription('');
    setImage(null);
    setName('');
  };

  // const getData = useCallback(async () => {
  //   try {
  //     const data = await axios.get('http://localhost:8000/api/slider');

  //     const sliderData = data?.data?.carouselItems[index];
  //     const image = {
  //       name: `slider_${index + 1}`,
  //       photo: sliderData.image,
  //     };

  //     setDescription(sliderData.description);
  //     setImage(image);
  //     setName(sliderData.name);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [index]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

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
          {/* <Box alignSelf='center'>
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
          </Box> */}
          <ActionButtons
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
          />
        </Box>
      )}
    </div>
  );
};

export default SliderTabPanel;
