import React, { useState, useEffect } from 'react';
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
  );
};

export default Dashboard;
