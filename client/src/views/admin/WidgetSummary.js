import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const WidgetSummary = (props) => {
  const { icon, title, value, color } = props;
  return (
    <Card>
      {/* <Card sx={{ borderRadius: '12px' }}> */}
      <Box
        p={2}
        display='flex'
        alignItems='center'
        justifyContent='space-between'>
        <Box>
          <Typography component='h2' variant='h6' color='primary'>
            {/* <Typography component='h2' variant='h6' color='text.secondary'> */}
            {title}
          </Typography>
          <Typography component='h1' variant='h4'>
            {value}
          </Typography>
          {/* <Typography component='h3' color='text.secondary'>
          on 15 March, 2019
        </Typography> */}
        </Box>
        <Box
          width={48}
          height={48}
          borderRadius='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          sx={{
            background: color,
          }}>
          {icon}
        </Box>
      </Box>
    </Card>
  );
};

export default WidgetSummary;
