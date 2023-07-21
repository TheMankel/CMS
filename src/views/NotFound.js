import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import NotFoundSVG from '../svg/NotFound';

const NotFound = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        height={'100%'}
        display={'flex'}
        alignItems={'center'}
        bgcolor={theme.palette.grey[400]}
        padding={'16px 0 '}>
        <Container>
          <Grid container spacing={6}>
            <Grid item container justifyContent={'center'} xs={12} md={6}>
              <Box
                height={'100%'}
                width={'100%'}
                maxWidth={{ xs: 500, md: '100%' }}>
                <NotFoundSVG width={'100%'} height={'100%'} />
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
                  404
                </Typography>
                <Typography
                  variant='h6'
                  component='p'
                  color='textSecondary'
                  align={'center'}>
                  Oops! Looks like you followed a bad link.
                  <br />
                  If you think this is a problem with us, please{' '}
                  <Link
                    component={NavLink}
                    to={'/contact'}
                    underline='none'
                    sx={{
                      '&:hover': {
                        opacity: 0.75,
                      },
                    }}>
                    tell us
                  </Link>
                </Typography>
                <Box
                  marginTop={4}
                  display={'flex'}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Button
                    component={NavLink}
                    variant='contained'
                    color='primary'
                    size='large'
                    to={'/'}>
                    Back home
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
