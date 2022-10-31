import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const RecentPost = (props) => {
  const { post } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography component='h4' variant='h5' gutterBottom>
        {post.title}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Typography variant='subtitle1' paragraph>
        {post.description}
      </Typography>
    </Grid>
  );
};

RecentPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecentPost;
