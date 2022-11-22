import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MailWriterIllustration from '../svg/MailWriter';
import Form from '../components/Form/Form';

const Contact = () => {
  return (
    <>
      <Container>
        <Grid container spacing={6} my={3}>
          <Grid item container justifyContent={'center'} xs={12} md={6}>
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={{ xs: 500, md: '100%' }}>
              <Box marginBottom={4}>
                <Box
                  component={Typography}
                  fontWeight={700}
                  variant={'h5'}
                  gutterBottom
                  align={'center'}>
                  CONTACT US
                </Box>
                <Typography
                  variant={'h6'}
                  component={'p'}
                  color={'textSecondary'}
                  align={'center'}>
                  We would love to talk about how we can help you.
                </Typography>
              </Box>
              <Box marginBottom={4}>
                <MailWriterIllustration width={'100%'} height={'100%'} />
              </Box>
              <Box>
                <Typography color='text.secondary' align={'center'}>
                  We'll get back to you in 1-2 business days.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            container
            alignItems={'center'}
            justifyContent={'center'}
            xs={12}
            md={6}>
            <Box>
              <Form />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
