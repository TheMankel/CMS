import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ContactCard = () => {
  const theme = useTheme();

  return (
    <Box
      component={Card}
      boxShadow={0}
      border={{
        xs: 0,
        md: `1px solid ${theme.palette.divider}`,
      }}>
      <Box margin={2}>
        <Typography
          sx={{
            fontWeight: '700',
          }}
          gutterBottom>
          How can you contact us about this notice?
        </Typography>
        <Typography
          variant={'body2'}
          color={'textSecondary'}
          sx={{
            marginBottom: 2,
          }}>
          If you have any questions or concerns about the privacy policy please
          contact us.
        </Typography>
        <Box display={'flex'} justifyContent={'center'}>
          <Button
            component={NavLink}
            variant='contained'
            size='large'
            endIcon={<ArrowForwardIcon />}
            to='/contact'
            sx={{
              textTransform: 'none',
            }}>
            Contact us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCard;
