import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';

const FeaturedCard = (props) => {
  const { item, url = '/', text = '', isLoading } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component={NavLink}
        to={url + item.title?.toLowerCase().replace(' ', '-')}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            {isLoading && (
              <>
                <Skeleton variant='text' width='50%' />
                <Skeleton variant='text' width='25%' />
                <Skeleton variant='text' width='75%' />
                <Skeleton variant='text' width='50%' />
              </>
            )}
            {!isLoading && (
              <>
                <Typography component='h2' variant='h5'>
                  {item.title}
                </Typography>
                <Typography
                  component='p'
                  variant='subtitle1'
                  color='text.secondary'>
                  {item.date}
                </Typography>
                <Typography variant='subtitle1' paragraph>
                  {item.description}
                </Typography>
                <Typography component='h3' variant='subtitle1' color='primary'>
                  {text}
                </Typography>
              </>
            )}
          </CardContent>
          {isLoading && (
            <CardMedia>
              <Skeleton
                variant='rounded'
                width={160}
                height={160}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
            </CardMedia>
          )}
          {!isLoading && (
            <CardMedia
              component='img'
              image={item.image || 'https://source.unsplash.com/random'}
              alt={item.title}
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            />
          )}
        </Card>
      </CardActionArea>
    </Grid>
  );
};
FeaturedCard.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedCard;
