import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudData from '../svg/CloudData';

const NoDataFound = (props) => {
  return (
    <Box
      height={'100%'}
      display={'flex'}
      alignItems={'center'}
      padding={'16px 0 '}>
      <Grid container spacing={6}>
        <Grid item container justifyContent={'center'} xs={12} md={6}>
          <Box
            height={'100%'}
            width={'100%'}
            maxWidth={{ xs: 500, md: '100%' }}>
            <CloudData width={'100%'} height={'100%'} />
          </Box>
        </Grid>
        <Grid
          item
          container
          alignItems={'center'}
          justifyContent={'center'}
          xs={12}
          md={6}>
          <Box>
            <Typography
              variant='h1'
              component={'h1'}
              align={'center'}
              sx={{ fontWeight: 700 }}>
              Oops!
            </Typography>
            <Typography
              variant='h6'
              component='p'
              color='textSecondary'
              align={'center'}>
              {props.message}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoDataFound;
