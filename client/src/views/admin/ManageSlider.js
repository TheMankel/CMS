import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Title from './Title';
import SliderTabPanel from './SliderTabPanel';

// function TabPanel(props) {
//   const {
//     // children,
//     value,
//     index,
//     // description,
//     // image,
//     // name,
//     // handleUpload,
//     ...other
//   } = props;
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState('');

//   const handleUpload = async (e) => {
//     console.log(e.target.files[0]);
//     try {
//       const imageFile = e.target.files[0];
//       if (!imageFile) return;

//       setImage(imageFile);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleCancel = () => {
//     setDescription('');
//     setImage(null);
//     setName('');
//   };

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`slider-tabpanel-${index}`}
//       aria-labelledby={`slider-tab-${index}`}
//       {...other}>
//       {value === index && (
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//           }}>
//           <Box display='flex' flexDirection='column' gap={1}>
//             <Title>Slider image</Title>
//             {image?.name && (
//               <Box
//                 component='img'
//                 src={image?.photo ? image?.photo : URL?.createObjectURL(image)}
//                 alt={image?.name}
//                 sx={{
//                   objectFit: 'cover',
//                   width: '50%',
//                   alignSelf: 'center',
//                   borderRadius: 2,
//                   mb: 1,
//                 }}
//               />
//             )}
//             <Button
//               id='upload-image'
//               variant='contained'
//               component='label'
//               onChange={handleUpload}
//               sx={{
//                 alignSelf: 'center',
//                 textTransform: 'none',
//               }}>
//               Upload
//               <input hidden accept='image/*' type='file' />
//             </Button>
//             <Box display='flex' gap={1}>
//               <Typography>Currently uploaded photo:</Typography>
//               <Typography color='GrayText'>
//                 {image?.name ? image?.name : 'none'}
//               </Typography>
//             </Box>
//           </Box>
//           <Box>
//             <Title>Slider name</Title>
//             <TextField
//               id='set-name'
//               label='Write slider name'
//               variant='outlined'
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               fullWidth
//               sx={{ mt: 1 }}
//             />
//           </Box>
//           <Box>
//             <Title>Slider description</Title>
//             <TextField
//               id='set-description'
//               label='Write slider description'
//               variant='outlined'
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               fullWidth
//               sx={{ mt: 1 }}
//             />
//           </Box>
//           <Box alignSelf='center'>
//             <Button
//               variant='outlined'
//               onClick={handleCancel}
//               sx={{
//                 mx: '4px',
//                 textTransform: 'none',
//               }}>
//               Cancel
//             </Button>
//             <Button
//               variant='contained'
//               type='submit'
//               sx={{
//                 mx: '4px',
//                 textTransform: 'none',
//               }}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </div>
//   );
// }

const SliderAdmin = () => {
  // const [postImage, setPostImage] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewPost = async (e) => {
    e.preventDefault();

    try {
    } catch (err) {
      console.log(err);
    }
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
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleNewPost}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant='fullWidth'
                  aria-label='full width tabs slider'>
                  <Tab label='First slider' />
                  <Tab label='Second slider' />
                  <Tab label='Third slider' />
                </Tabs>
              </Box>
            </Paper>
            <Paper
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleNewPost}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
              {/* <TabPanel value={value} index={0} />
              <TabPanel value={value} index={1} />
              <TabPanel value={value} index={2} /> */}
              {/* <SliderTabPanel value={value} index={value} /> */}
              <SliderTabPanel value={value} index={0} />
              <SliderTabPanel value={value} index={1} />
              <SliderTabPanel value={value} index={2} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SliderAdmin;
