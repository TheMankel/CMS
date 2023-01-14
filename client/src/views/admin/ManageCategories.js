import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
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
import Info from '../../components/Info/Info';
import AlertInfo from '../../components/AlertInfo/AlertInfo';
import axios from 'axios';
import {
  createRef,
  uploadImage,
  downloadImage,
  deleteImage,
  getListImages,
} from '../../lib/storage';
import { getData } from '../../lib/api';
import { verifyImage } from '../../lib/file-type';

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [newCategory, setNewCategory] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
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
        setOpen(true);

        return;
      }

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

    if (!categoryTitle || !categoryDescription || !categoryImage) {
      setMessage('Please provide all data!');
      setSeverity('error');
      setOpen(true);

      return;
    }

    const title = categoryTitle?.toLowerCase().replaceAll(' ', '-');
    const allPostImagesRef = createRef(`categoryImages`);
    const categoryImageRef = createRef(`categoryImages/${title}`);

    const uploadedImages = await getListImages(allPostImagesRef);
    const isDuplicate = uploadedImages.some((image) => image.name === title);
    // console.log(isDuplicate);

    if (isDuplicate && newCategory) {
      setMessage('There is already a category with this title!');
      setSeverity('error');
      setOpen(true);

      return;
    }

    if (categoryImage instanceof File)
      await uploadImage(categoryImageRef, categoryImage);
    const categoryImageUrl = await downloadImage(categoryImageRef);

    try {
      const data = {
        title: categoryTitle,
        description: categoryDescription,
        image: categoryImageUrl,
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
    setMessage(
      newCategory
        ? 'Successfully added a category!'
        : 'Successfully edited a category!',
    );
    setSeverity('success');
    setOpen(true);
    setCategoryTitle('');
    setCategoryDescription('');
    setCategoryImage(null);
    setNewCategory(true);
    //GetData
    await getData('categories', handleCategories);
  };

  const handleEdit = async (e) => {
    setNewCategory(false);

    const categoryId = e.currentTarget?.id;
    console.log(categoryId);

    const categoryToEdit = categories?.find(
      (category) => category.title === categoryId,
    );
    console.log(categoryToEdit);
    const image = {
      name: categoryToEdit.title.toLowerCase().replaceAll(' ', '-'),
      photo: categoryToEdit.image,
    };
    console.log(image);
    setCategoryTitle(categoryToEdit.title);
    setCategoryDescription(categoryToEdit.description);
    setCategoryImage(image);
  };

  const handleDelete = async (e) => {
    try {
      const id = e.currentTarget?.id;
      console.log(id);

      if (!id) {
        setMessage('Could not delete a category. Try again later!');
        setSeverity('error');
        setOpen(true);

        return;
      }

      const data = { id: id };
      const res = await axios.post(
        'http://localhost:8000/api/delete-category',
        data,
      );

      if (res.status !== 200) {
        setMessage('Something went wrong. Try again later!');
        setSeverity('error');
        setOpen(true);

        return;
      }
      const categoryId = id.toLowerCase().replaceAll(' ', '-');
      const categoryImageRef = createRef(`categoryImages/${categoryId}`);
      deleteImage(categoryImageRef);
    } catch (err) {
      console.log(err);
    }
    setMessage('Successfully deleted a category!');
    setSeverity('success');
    setOpen(true);
    setCategoryTitle('');
    setCategoryDescription('');
    setCategoryImage(null);
    setNewCategory(true);
    //GetData
    await getData('categories', handleCategories);
  };

  const handleCategories = (data) => {
    setCategories(data);
    console.log(data);
  };

  useEffect(() => {
    getData('categories', handleCategories, setIsLoading);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Title>Add category</Title>
            <TextField
              id='set-category'
              label='Write new category title'
              variant='outlined'
              value={categoryTitle}
              disabled={!newCategory}
              onChange={(e) => setCategoryTitle(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Title>Category description</Title>
            <TextField
              id='set-categoryDescription'
              label='Write category description'
              variant='outlined'
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Box display='flex' flexDirection='column' gap={1}>
            <Title>Category image</Title>
            {categoryImage?.name && (
              <Box
                component='img'
                src={
                  categoryImage?.photo
                    ? categoryImage?.photo
                    : URL?.createObjectURL(categoryImage)
                }
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
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Categories</Title>
          {isLoading && (
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Category names</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {categories.length === 0 && !isLoading && (
            <Info message='No categories added!' />
          )}
          {categories.length > 0 && !isLoading && (
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Category names</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((category, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{category?.title}</TableCell>
                    <TableCell>{category?.date}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        id={category?.title}
                        aria-label='edit category'
                        component='label'
                        onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        id={category?.title}
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
          )}
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

export default Categories;
