import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import RecentUsers from './RecentUsers';
import WidgetSummary from './WidgetSummary.js';
import { getData } from '../../lib/api';

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [recentUsers, setRecentUsers] = useState([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);

  useEffect(() => {
    getData('summary', setSummary, setIsLoadingSummary);
    getData('recent-users', setRecentUsers, setIsLoadingTable);
  }, []);

  return (
    // <Box
    //   component='main'
    //   sx={{
    //     backgroundColor: (theme) =>
    //       theme.palette.mode === 'light'
    //         ? theme.palette.grey[100]
    //         : theme.palette.grey[900],
    //     flexGrow: 1,
    //     height: '100vh',
    //     overflow: 'auto',
    //   }}>
    //   <Toolbar />
    //   <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={4}>
        <WidgetSummary
          icon={<ArticleIcon sx={{ color: '#ffffff' }} />}
          title='Posts'
          value={summary.posts}
          color='#c70046'
          isLoading={isLoadingSummary}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <WidgetSummary
          icon={<CategoryIcon sx={{ color: '#ffffff' }} />}
          title='Categories'
          value={summary.categories}
          color='#00c788'
          isLoading={isLoadingSummary}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <WidgetSummary
          icon={<PeopleIcon sx={{ color: '#ffffff' }} />}
          title='Users'
          value={summary.users}
          color='#ffbf00'
          isLoading={isLoadingSummary}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <RecentUsers recentUsers={recentUsers} isLoading={isLoadingTable} />
        </Paper>
      </Grid>
    </Grid>
    //   </Container>
    // </Box>
  );
};

export default Dashboard;
