import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SliderTabPanel from './SliderTabPanel';

const SliderAdmin = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      component='main'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant='fullWidth'
                  aria-label='full width tabs slider'>
                  <Tab label='First slider' />
                  <Tab label='Second slider' />
                  <Tab label='Third slider' />
                </Tabs>
              </Box>
            </Paper>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
              <SliderTabPanel value={value} index={0} />
              <SliderTabPanel value={value} index={1} />
              <SliderTabPanel value={value} index={2} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SliderAdmin;
