import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AboutTabPanel from './AboutTabPanel';

const AboutAdmin = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant='fullWidth'
              aria-label='full width tabs about'>
              <Tab label='Story' />
              <Tab label='Manage Team' />
            </Tabs>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AboutTabPanel value={value} index={0} />
          <AboutTabPanel value={value} index={1} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutAdmin;
