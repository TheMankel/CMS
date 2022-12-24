import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TeamWorkingIllustration from '../../svg/TeamWorking';

const Story = (props) => {
  const { primaryText, secondaryText, loading } = props;

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          component={'h2'}
          gutterBottom
          color={'textSecondary'}
          align={'center'}
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}>
          Our story
        </Typography>
        <Box px={2} align={'center'}>
          <Typography
            variant={'h3'}
            fontWeight={700}
            gutterBottom
            align={'center'}
            maxWidth='700px'>
            {loading ? <Skeleton /> : primaryText}
            {/* {primaryText} */}
          </Typography>
        </Box>
        <Box px={2} align={'center'}>
          <Typography
            variant={'h6'}
            component={'p'}
            color={'textSecondary'}
            align={'center'}
            maxWidth='1000px'>
            {loading ? <Skeleton /> : secondaryText}
            {/* {secondaryText} */}
          </Typography>
        </Box>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}>
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
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={4}>
        <Box height={'100%'} width={'100%'} maxWidth={600}>
          <TeamWorkingIllustration height={'100%'} width={'100%'} />
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Story;
