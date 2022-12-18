import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const FeaturedPost = (props) => {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component={NavLink}
        to={'/posts/' + post.title.toLowerCase().replace(' ', '-')}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component='h2' variant='h5'>
              {post.title}
            </Typography>
            <Typography
              component='p'
              variant='subtitle1'
              color='text.secondary'>
              {post.date}
            </Typography>
            <Typography variant='subtitle1' paragraph>
              {post.description}
            </Typography>
            <Typography component='h3' variant='subtitle1' color='primary'>
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component='img'
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.title}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
