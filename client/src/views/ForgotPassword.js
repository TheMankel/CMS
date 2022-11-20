import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormForgotPass from '../components/FormForgotPass/FormForgotPass';
import Success from '../components/Success/Success';
import MainPublic from '../layouts/MainPublic';

const ForgotPassword = () => {
  return (
    <MainPublic>
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
        <Container>
          <Success />
        </Container>
      </Box>
    </MainPublic>
  );
};

export default ForgotPassword;
