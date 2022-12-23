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
import { useAuth } from '../contexts/authContext';

const PostDetails = () => {
  const params = useParams();
  const { postId } = params;
  const { user } = useAuth();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');

  const getData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/posts/${postId}`);
      const data = res.data;

      setPost(data);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      if (!comment.trim()) return;

      const data = {
        uid: user.uid,
        commentText: comment,
      };

      await axios.post(`http://localhost:8000/api/comment/${postId}`, data);
    } catch (err) {
      console.log(err);
    }
    setComment('');
    getData();
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
            {user && (
              <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleAddComment}
                px={2}
                display='flex'
                alignItems='center'
                gap={2}>
                <Avatar alt='Avatar' src={user?.photoURL} />
                <TextField
                  placeholder='Add a comment'
                  variant='outlined'
                  fullWidth
                  multiline
                  id='comment'
                  name='comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
            )}
            <Comments comments={post?.comments} />
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetails;
