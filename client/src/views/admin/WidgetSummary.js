import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const WidgetSummary = (props) => {
  const { icon, title, value } = props;
  return (
    <Card sx={{ borderRadius: '12px' }}>
      <Box
        p={2}
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'>
        {/* <Box
          width={48}
          height={48}
          mb={2}
          borderRadius='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{
            background:
              'radial-gradient(circle, rgba(63,94,255,1) 0%, rgba(217,234,255,1) 100%)',
          }}>
          {icon}
        </Box> */}
        <Typography component='h1' variant='h4'>
          {value}
        </Typography>
        <Typography component='h2' variant='h6'>
          {title}
        </Typography>
        {/* <Typography component='h3' color='text.secondary'>
          on 15 March, 2019
        </Typography> */}
      </Box>
    </Card>
  );
};

export default WidgetSummary;
