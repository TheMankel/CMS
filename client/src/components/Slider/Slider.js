import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

const Slider = (props) => {
  const { items, isLoading } = props;

  return (
    <>
      {isLoading && (
        <Card
          sx={{ marginTop: '24px', backgroundColor: 'rgba(0, 0, 0, 0.11)' }}>
          <Skeleton variant='rounded' height={340 - 118.8} />
          <CardMedia>
            <CardContent
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.31)',
                backgroundBlendMode: 'difference',
                p: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Skeleton
                variant='rounded'
                sx={{
                  bgcolor: 'grey.400',
                  my: 1,
                  width: '50%',
                  alignSelf: 'center',
                }}
              />
              <Skeleton variant='rounded' sx={{ bgcolor: 'grey.400', my: 1 }} />
            </CardContent>
          </CardMedia>
        </Card>
      )}
      {!isLoading && (
        <Carousel animation='slide' sx={{ marginTop: '24px', borderRadius: 1 }}>
          {items.map((item, i) => (
            <Grid item xs={4} key={i}>
              <Card>
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
              </Card>
            </Grid>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Slider;
