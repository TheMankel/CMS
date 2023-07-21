import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const WidgetSummary = (props) => {
  const { icon, title, value, color, isLoading } = props;
  return (
    <Card>
      <Box
        p={2}
        display='flex'
        alignItems='center'
        justifyContent='space-between'>
        <Box>
          <Typography component='h2' variant='h6' color='primary'>
            {title}
          </Typography>
          <Typography component='h1' variant='h4'>
            {!isLoading ? value : <Skeleton variant='text' />}
          </Typography>
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
