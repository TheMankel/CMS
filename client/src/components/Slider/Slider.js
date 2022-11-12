import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const Slider = (props) => {
  const { items } = props;
  return (
    <Carousel animation='slide' sx={{ marginTop: '24px' }}>
      {items.map((item, i) => (
        <Grid item xs={4} key={i}>
          <CardMedia
            image={item.image}
            title={item.name}
            sx={{
              height: '340px',
              overflow: 'hidden',
            }}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <CardContent
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  backgroundBlendMode: 'darken',
                  p: '24px',
                  textOverflow: 'ellipsis',
                  textAlign: 'center',
                }}>
                <Typography component='h1' variant='h4'>
                  {item.name}
                </Typography>
                <Typography component='p' variant='subtitle1'>
                  {item.description}
                </Typography>
              </CardContent>
            </div>
          </CardMedia>
        </Grid>
      ))}
    </Carousel>
  );
};

export default Slider;
