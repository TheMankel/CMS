import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SliderTabPanel from './SliderTabPanel';

const SliderAdmin = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (e, newValue) => {
    setOpen(false);
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
              aria-label='full width tabs slider'>
              <Tab label='First slider' />
              <Tab label='Second slider' />
              <Tab label='Third slider' />
            </Tabs>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SliderTabPanel
            value={value}
            index={0}
            open={open}
            handleOpen={setOpen}
          />
          <SliderTabPanel
            value={value}
            index={1}
            open={open}
            handleOpen={setOpen}
          />
          <SliderTabPanel
            value={value}
            index={2}
            open={open}
            handleOpen={setOpen}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SliderAdmin;
