import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Sidebar = (props) => {
  const { archives, social, isLoadingArchives, isLoadingSocial } = props;

  const socialProvided = social.some((network) => network?.url !== '');

  return (
    <Grid item xs={12} md={4}>
      {(archives.length > 0 || isLoadingArchives) && (
        <Typography component='h4' variant='h6' gutterBottom>
          Archives
        </Typography>
      )}
      {isLoadingArchives && (
        <>
          <Skeleton variant='text' width='25%' />
          <Skeleton variant='text' width='25%' />
          <Skeleton variant='text' width='25%' />
          <Skeleton variant='text' width='25%' />
        </>
      )}
      {!isLoadingArchives &&
        archives?.map((archive) => (
          <Link
            component={NavLink}
            display='block'
            variant='body1'
            underline='none'
            to={
              'posts/archives/' +
              archive?.title?.toLowerCase()?.split(' ')?.join('/')
            }
            key={archive?.title}
            sx={{
              '&:hover': {
                opacity: 0.75,
              },
            }}>
            {archive?.title}
          </Link>
        ))}
      {(socialProvided || isLoadingSocial) && (
        <Typography component='h4' variant='h6' gutterBottom sx={{ mt: 3 }}>
          Social
        </Typography>
      )}
      {isLoadingSocial && (
        <>
          <Box display='flex' gap={1}>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton variant='text' width='25%' />
          </Box>
          <Box display='flex' gap={1}>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton variant='text' width='25%' />
          </Box>
          <Box display='flex' gap={1}>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton variant='text' width='25%' />
          </Box>
          <Box display='flex' gap={1}>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton variant='text' width='25%' />
          </Box>
        </>
      )}
      {!isLoadingSocial &&
        social?.map(
          (network) =>
            network?.url && (
              <Link
                // component={NavLink}
                display='block'
                variant='body1'
                underline='none'
                target='_blank'
                href={network?.url}
                key={network?.name}
                sx={{
                  mb: 0.5,
                  '&:hover': {
                    opacity: 0.75,
                  },
                }}>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <network.icon />
                  <span>{network?.name}</span>
                </Stack>
              </Link>
            ),
        )}
    </Grid>
  );
};

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Sidebar;
