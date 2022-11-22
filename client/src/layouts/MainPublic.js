import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axios from 'axios';

const MainPublic = (props) => {
  const [sections, setSections] = useState([{ title: '', url: '' }]);
  const [categories, setCategories] = useState([{ title: '', links: [''] }]);
  // const [loading, setLoading] = useState(true);
  const theme = createTheme();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await axios.get('http://localhost:8000/api/navigation');
      setCategories(data?.data?.categories);
      setSections(data?.data?.sections);
    } catch (err) {
      console.log(err);
    }
  };

  // const sections = [
  //   { title: 'Technology', url: '#' },
  //   { title: 'Design', url: '#' },
  //   { title: 'Culture', url: '#' },
  //   { title: 'Business', url: '#' },
  //   { title: 'Politics', url: '#' },
  //   { title: 'Opinion', url: '#' },
  //   { title: 'Science', url: '#' },
  //   { title: 'Health', url: '#' },
  //   { title: 'Style', url: '#' },
  //   { title: 'Travel', url: '#' },
  // ];

  // const categories = [
  //   {
  //     title: 'category1',
  //     links: ['link1', 'link2', 'link3', 'link4'],
  //   },
  //   {
  //     title: 'category2',
  //     links: ['link1', 'link2', 'link3', 'link4'],
  //   },
  //   {
  //     title: 'category3',
  //     links: ['link1', 'link2', 'link3', 'link4'],
  //   },
  // ];

  const logo =
    'https://seeklogo.com/images/B/blogger_B-logo-47610B2F87-seeklogo.com.png';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title='Blog' logo={logo} sections={sections} />
      <Outlet />
      <Footer title='Blog' categories={categories} />
    </ThemeProvider>
  );
};

export default MainPublic;
