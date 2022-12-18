import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const RecentPost = (props) => {
  const { post } = props;

  return (
    <Grid item xs={12} md={8}>
      {/* <Typography component='h4' variant='h5' gutterBottom>
        {post.title}
      </Typography> */}
      <Card sx={{ flex: 1 }}>
        <CardMedia
          image={post?.image}
          title={post?.title}
          sx={{
            height: '200px',
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
        {/* <Divider sx={{ mb: 1 }} /> */}
        {/* <Typography variant='subtitle1' paragraph>
        {post.description}
      </Typography> */}
        <CardContent sx={{ flex: 1 }}>
          <Box>
            <div
              dangerouslySetInnerHTML={{
                __html: post?.text?.replace('<br>', '<br/>'),
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

// RecentPost.propTypes = {
//   post: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default RecentPost;
