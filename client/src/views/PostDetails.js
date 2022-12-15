import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Avatar, Button, TextField } from '@mui/material';
import Comments from '../components/Comments/Comments';
import useFirestoreData from '../hooks/useFirestoreData';

const PostDetails = () => {
  const params = useParams();
  const { postId } = params;
  console.log(postId);
  const { firestoreData } = useFirestoreData('posts/venice-flooding');
  const [post, setPost] = useState({});

  useEffect(() => {
    console.log(firestoreData);

    if (!firestoreData) return;
    setPost(firestoreData);
  }, [firestoreData]);

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
      {/* <div>PostDetails</div>
      <div>ID: {postId}</div> */}
      <Container maxWidth='lg'>
        <Grid item xs={4}>
          <CardMedia
            // image='https://www.theblondeabroad.com/wp-content/uploads/2018/10/VENICE-ITALY.jpg'
            image={post.image}
            // title='Cos tytuł'
            title={post.title}
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
                  {post.title}
                </Typography>
              </CardContent>
            </div>
          </CardMedia>
          {/* <Box>
            <p>
              In the wake of the November, 2019 flooding in Venice, we thought
              it would be helpful to draw your attention to our&nbsp;acqua
              alta&nbsp;resources here and at our main travel-planning site,
              <strong>&nbsp;</strong>
              <a
                href='Veniceforvisitors.com'
                rel='noopener noreferrer'
                target='_blank'>
                <strong>Veniceforvisitors.com</strong>
              </a>
              :
            </p>
            <h4>
              <strong>Acqua Alta</strong>
            </h4>
            <p>
              This illustrated article at Venice for Visitors tells what&nbsp;
              <em>acqua </em>alta&nbsp;or "high water" is and how to prepare for
              it if you're going to Venice from mid-autumn through early spring.
            </p>
            <h4>
              <strong>Venice Travel Blog: Flooding</strong>
            </h4>
            <p>
              Our&nbsp;<em>acqua alta&nbsp;</em>index page links to a number of
              posts about Venice tidal flooding (including this one), featuring
              such topics as&nbsp;tidal warning sirens&nbsp;and forecasting apps
              for your iPhone or Android smartphone.
            </p>
            <h4>
              <strong>Important things to know:</strong>
            </h4>
            <ul>
              <li>
                <em>Acqua alta</em>&nbsp;is an abnormally high tide that occurs
                under certain weather conditions--e.g., when atmospheric
                pressures are low and winds from the south push water northward
                in the Adriatic Sea.
              </li>
              <li>
                <em>Acqua alta</em>&nbsp;tends to occur seasonally (mostly from
                October until March or April), and it typically lasts only a few
                hours at a time. Just as important, it normally affects only
                lower-lying areas of the city (such as the Piazza San Marco,
                where water can seep up through the drains even in midsummer).
                You should not let fear of&nbsp;<em>acqua alta&nbsp;</em>
                discourage you from visiting Venice.
              </li>
              <li>
                If you're visiting Venice from fall through spring, don't book
                ground-floor accommodation. (This isn't likely to be an issue in
                hotels, where rooms are usually on upper floors, but short-term
                apartment rentals at street level can be risky.)
              </li>
              <li>
                When<em>&nbsp;acqua alta</em>&nbsp;does occur,&nbsp;avoid
                frolicking in the water. Flood tides are a costly nuisance to
                the locals, and splashing around, kicking up water in the
                streets, or stripping down and swimming in front of the Basilica
                di San Marco isn't likely to win you any Venetian friends.
              </li>
            </ul>
            <br />
          </Box> */}
          <Box>
            <div
              dangerouslySetInnerHTML={{
                __html: post.text.replace('<br>', '<br/>'),
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
            <Comments comments={comments} />
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetails;
