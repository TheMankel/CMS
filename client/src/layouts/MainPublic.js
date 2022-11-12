import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/authContext';

const MainPublic = (props) => {
  const { currentUser } = useAuth();
  const theme = createTheme();

  const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];

  const logo = 'https://source.unsplash.com/random';

  const categories = [
    {
      title: 'category1',
      links: ['link1', 'link2', 'link3', 'link4'],
    },
    {
      title: 'category2',
      links: ['link1', 'link2', 'link3', 'link4'],
    },
    {
      title: 'category3',
      links: ['link1', 'link2', 'link3', 'link4'],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={currentUser} title='Blog' logo={logo} sections={sections} />
      <div>{props.children}</div>;
      <Footer title='Blog' categories={categories} />
    </ThemeProvider>
  );
};

export default MainPublic;
