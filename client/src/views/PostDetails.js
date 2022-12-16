import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Comments from '../components/Comments/Comments';
import axios from 'axios';

const PostDetails = () => {
  const params = useParams();
  const { postId } = params;
  const [post, setPost] = useState({});

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/posts/${postId}`,
      );

      console.log(data);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const comments = [
    {
      fullName: 'Panama Lama',
      commentText: 'Bardzo fajnie. Nie pisz więcej.',
      avatar: 'https://pliki.meczyki.pl/user/232/5c6015d2ef516.jpg',
    },
    {
      fullName: 'Ewa Mewa',
      commentText: 'Super.',
      avatar:
        'https://images.unsplash.com/photo-1545238377-dee9b7db2414?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    },
  ];

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentRef = new FormData(e.currentTarget);
    console.log(commentRef.get('comment'));
    e.currentTarget.reset();
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Grid item xs={4}>
          <CardMedia
            image={post?.image}
            title={post?.title}
            sx={{
              height: '340px',
              overflow: 'hidden',
            }}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CardContent
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  backgroundBlendMode: 'darken',
                  p: '24px',
                  px: 8,
                  textOverflow: 'ellipsis',
                  textAlign: 'center',
                  borderRadius: 2,
                }}>
                <Typography
                  component='h1'
                  variant='h4'
                  maxWidth='800px'
                  sx={{ wordBreak: 'break-word' }}>
                  {post?.title}
                </Typography>
              </CardContent>
            </div>
          </CardMedia>
          <Box>
            <div
              dangerouslySetInnerHTML={{
                __html: post?.text?.replace('<br>', '<br/>'),
              }}
            />
          </Box>
          <Box>
            <Typography variant='h5' gutterBottom>
              Comments
            </Typography>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleAddComment}
              px={2}
              display='flex'
              alignItems='center'
              gap={2}>
              <Avatar alt='Avatar' src='' />
              <TextField
                placeholder='Add a comment'
                variant='outlined'
                fullWidth
                multiline
                id='comment'
                name='comment'
              />
              <Box>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                  }}>
                  Add
                </Button>
              </Box>
            </Box>
            {/* <Comments comments={comments} /> */}
            <Comments comments={post?.comments} />
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetails;
