import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormForgotPass from '../components/FormForgotPass/FormForgotPass';
// import MainPublic from '../layouts/MainPublic';

const ForgotPassword = () => {
  return (
    <>
      <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100%'}>
        <Container>
          <FormForgotPass />
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
