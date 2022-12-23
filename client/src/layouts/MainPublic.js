import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axios from 'axios';

const MainPublic = (props) => {
  const { showDetailed } = props;
  const [logo, setLogo] = useState('');
  const [webTitle, setWebTitle] = useState('');
  const [contact, setContact] = useState({});
  const [categories, setCategories] = useState(null);
  const theme = createTheme();

  const getData = async () => {
    try {
      // const data = await axios.get('http://localhost:8000/api/navigation');
      const blogRes = await axios.get('http://localhost:8000/api/blog');
      const contactRes = await axios.get('http://localhost:8000/api/contact');
      const categoriesRes = await axios.get(
        'http://localhost:8000/api/categories',
      );

      const blogData = blogRes?.data;
      const contactData = contactRes?.data;
      const categoriesData = categoriesRes?.data;

      // setCategories(data?.data?.categories);
      // setSections(data?.data?.sections);
      // setWebTitle(data?.data?.title);
      // setLogo(data?.data?.logo);

      const categoriesMap = categoriesData.map((category) => ({
        title: category.title,
        url: `/posts/category/${category.title
          .toLowerCase()
          .replace(' ', '-')}`,
      }));

      setWebTitle(blogData?.title);
      setLogo(blogData?.logo);
      setContact(contactData);
      setCategories(categoriesMap);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const postCategories = [
  //   {
  //     title: 'Europe',
  //     url: '/europe',
  //   },
  //   {
  //     title: 'Asia',
  //     url: '/asia',
  //   },
  //   {
  //     title: 'North America',
  //     url: '/north-america',
  //   },
  //   {
  //     title: 'South America',
  //     url: '/south-america',
  //   },
  //   {
  //     title: 'Australia',
  //     url: '/australia',
  //   },
  //   {
  //     title: 'Africa',
  //     url: '/africa',
  //   },
  // ];

  const navHeader = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Posts',
      url: '/posts',
    },
    {
      title: 'About',
      url: '/about',
    },
    {
      title: 'Contact',
      url: '/contact',
    },
  ];

  // navHeader.splice(2, 0, ...postCategories);
  if (categories) navHeader?.splice(2, 0, ...categories);

  const navFooter = [
    {
      title: 'Posts',
      links: [
        { title: 'All Posts', url: '/posts' },
        { title: 'Categories', url: '/categories' },
      ],
    },
    {
      title: 'Blog',
      links: [
        { title: 'About', url: '/about' },
        { title: 'Privacy Policy', url: '/privacy-policy' },
      ],
    },
  ];

  // const contact = {
  //   email: 'blog@blog.com',
  //   phone: '+48123456789',
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        title={webTitle}
        logo={logo}
        navigation={navHeader}
        showDetailed={showDetailed}
      />
      <Outlet />
      <Footer
        title={webTitle}
        navigation={navFooter}
        contact={contact}
        showDetailed={showDetailed}
      />
    </ThemeProvider>
  );
};

export default MainPublic;
