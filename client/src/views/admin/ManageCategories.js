import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Title from '../../components/Title/Title';
import axios from 'axios';
import {
  createRef,
  uploadImage,
  downloadImage,
  deleteImage,
} from '../../lib/storage';
import { getData } from '../../lib/api';
import { verifyImage } from '../../lib/file-type';

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [newCategory, setNewCategory] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [id, setId] = useState(null);

  const handleUpload = async (e) => {
    try {
      const imageFile = e.target.files[0];
      const status = await verifyImage(imageFile);

      console.log(status);
      if (status !== 'Ok' || !imageFile) return;

      setCategoryImage(imageFile);
      e.target.value = '';
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setCategoryTitle('');
    setCategoryDescription('');
    setCategoryImage(null);
    setNewCategory(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!categoryTitle || !categoryDescription) return;

    const categoryImageRef = createRef(`categoryImages/${categoryTitle}`);

    try {
      const data = {
        title: categoryTitle,
        description: categoryDescription,
        image: categoryImageRef,
      };

      if (newCategory)
        await axios.post('http://localhost:8000/api/update-category', data, {
          withCredentials: true,
        });
      else
        await axios.post('http://localhost:8000/api/edit-category', data, {
          withCredentials: true,
        });
    } catch (err) {
      console.log(err);
    }
    setCategoryTitle('');
    setCategoryDescription('');
    setCategoryImage(null);
    setNewCategory(true);
    //GetData
    await getData('categories', handleCategories);
  };

  const handleEdit = async (e) => {};

  const handleDelete = async (e) => {};

  const handleCategories = (data) => {
    setCategories(data);
    console.log(data);
  };

  useEffect(() => {
    getData('categories', handleCategories);
  }, []);

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
                <Title>Add category</Title>
                <TextField
                  id='set-category'
                  label='Write new category title'
                  variant='outlined'
                  value={categoryTitle}
                  onChange={(e) => setCategoryTitle(e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box mt={1}>
                <Title>Category description</Title>
              </Box>
              <TextField
                id='set-categoryDescription'
                label='Write category description'
                variant='outlined'
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
              <Box display='flex' flexDirection='column' gap={1} mt={1}>
                <Title>Category image</Title>
                {categoryImage?.name && (
                  <Box
                    component='img'
                    src={
                      categoryImage?.photo
                        ? categoryImage?.photo
                        : URL?.createObjectURL(categoryImage)
                    }
                    // src=''
                    alt={categoryImage?.name}
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
                  id='upload-background'
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
                    {categoryImage?.name ? categoryImage.name : 'none'}
                  </Typography>
                </Box>
              </Box>
              <ActionButtons
                handleCancel={handleCancel}
                handleUpdate={handleUpdate}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>Categories</Title>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Category names</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.map((category, i) => (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>{category?.title}</TableCell>
                      <TableCell align='center'>
                        <IconButton
                          id={category?.id}
                          aria-label='edit category'
                          component='label'
                          onClick={handleEdit}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          id={category?.id}
                          aria-label='delete category'
                          component='label'
                          onClick={handleDelete}>
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
      </Container>
    </Box>
  );
};

export default Categories;
