import React from 'react';
// import { useTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TeamWorkingIllustration from '../../svg/TeamWorking';

const Story = () => {
  // const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}>
          Our story
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}>
          We travel around the world
          <br />
          and blog about it!
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}>
          We were in every continent on the world and made a movie about it! We
          are also blogging every bit of our life here for five years already.
        </Typography>
        <Box marginTop={3} display={'flex'} justifyContent={'center'}></Box>
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
