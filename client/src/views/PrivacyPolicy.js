import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContactCard from '../components/ContactCard/ContactCard';
import PrivacySection from '../components/PrivacySection/PrivacySection';
import { getData } from '../lib/api';

const PrivacyPolicy = () => {
  const [content, setContent] = useState([
    {
      title: '',
      description: '',
    },
  ]);
  const [created, setCreated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleData = (data) => {
    setContent(data?.content);
    setCreated(data?.created);
  };

  useEffect(() => {
    getData('privacy-policy', handleData, setIsLoading);
  }, []);

  const theme = useTheme();

  return (
    <Box>
      <Container>
        <Box boxShadow={4} borderRadius={2} my={5}>
          <Box bgcolor={theme.palette.primary.main} borderRadius={2}>
            <Container sx={{ py: 2 }}>
              <Typography
                variant={'h3'}
                gutterBottom
                color='white'
                fontWeight={700}>
                Privacy Policy
              </Typography>
              {created && (
                <Typography variant={'h6'} gutterBottom color='white'>
                  Last modified on <strong>{created}</strong>
                </Typography>
              )}
            </Container>
            <Box
              component={'svg'}
              preserveAspectRatio='none'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 1920 100.1'
              width={'100%'}
              marginBottom={-1}>
              <path
                fill={theme.palette.background.paper}
                d='M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z'></path>
            </Box>
          </Box>
          <Container position={'relative'} top={0}>
            <Box
              component={Grid}
              container
              spacing={4}
              flexDirection={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} md={9}>
                <PrivacySection content={content} isLoading={true} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  position={'sticky'}
                  top={theme.spacing(10)}
                  className={'sticky'}>
                  <ContactCard />
                </Box>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
