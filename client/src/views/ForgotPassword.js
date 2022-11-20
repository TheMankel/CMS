import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormForgotPass from '../components/FormForgotPass/FormForgotPass';
import Success from '../components/Success/Success';

const ForgotPassword = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [status, setStatus] = useState(1);
  const theme: any = useTheme();

  const callbackSuccess = (val: any) => {
    setSuccess(true);
    setStatus(val);
  };

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}>
      <Container
        maxWidth={600}
        sx={isSuccess ? { display: 'none' } : { display: 'flex' }}>
        <FormForgotPass callback={callbackSuccess} theme={theme} />
      </Container>
      <Container
        maxWidth={600}
        sx={isSuccess ? { display: 'flex' } : { display: 'none' }}>
        <Success theme={theme} status={status} />
      </Container>
    </Box>
  );
};

export default ForgotPassword;
