import React, { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Sidebar from '../components/Sidebar/Sidebar';
import Slider from '../components/Slider/Slider';
import RecentPost from '../components/RecentPost/RecentPost';
import FeaturedPost from '../components/FeaturedPost/FeaturedPost';
import axios from 'axios';

const Homepage = () => {
  const [recentPost, setRecentPost] = useState({});
  const [carouselItems, setCarouselItems] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);

  // const recentPost = {
  //   title: 'Title of a recent blog post',
  //   date: 'Nov 12',
  //   description:
  //     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  //   image: 'https://source.unsplash.com/random',
  //   imageLabel: 'Image Text',
  // };

  // const featuredPosts = [
  //   {
  //     title: 'Featured post',
  //     date: 'Nov 12',
  //     description:
  //       'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //     image: 'https://source.unsplash.com/random',
  //     imageLabel: 'Image Text',
  //   },
  //   {
  //     title: 'Post title',
  //     date: 'Nov 11',
  //     description:
  //       'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //     image: 'https://source.unsplash.com/random',
  //     imageLabel: 'Image Text',
  //   },
  // ];

  const sidebar = {
    title: 'About',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon, url: '' },
      { name: 'Twitter', icon: TwitterIcon, url: '' },
      { name: 'Facebook', icon: FacebookIcon, url: '' },
      { name: 'Instagram', icon: InstagramIcon, url: '' },
    ],
  };

  const getData = useCallback(async () => {
    try {
      const postsRes = await axios.get('http://localhost:8000/api/posts');
      const sliderRes = await axios.get('http://localhost:8000/api/slider');
      const pinnedPostsRes = await axios.get(
        'http://localhost:8000/api/pinned-posts',
      );
      const postsData = postsRes?.data?.posts;
      const sliderData = sliderRes?.data?.carouselItems;
      const pinnedPostsData = pinnedPostsRes?.data;

      if (!postsData) return;

      const recentPostData = postsData.pop();
      setRecentPost(recentPostData);
      console.log(recentPostData);

      if (!sliderData) return;

      setCarouselItems(sliderData);
      console.log(sliderData);

      if (!pinnedPostsData) return;

      setPinnedPosts(pinnedPostsData);
      console.log(pinnedPostsData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
    // getPostData();
  }, [getData]);

  // const getData = async () => {
  //   try {
  //     const data = await axios.get('http://localhost:8000/api/slider');

  //     setCarouselItems(data?.data.carouselItems);

  //     // setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const carouselItems = [
  //   {
  //     name: '1',
  //     description: 'Probably the most random thing you have ever seen!',
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     name: '2',
  //     description: 'Hello World!',
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     name: '3',
  //     description: 'Ok bye!',
  //     image: 'https://source.unsplash.com/random',
  //   },
  // ];

  return (
    <>
      <Container maxWidth='lg'>
        <Slider items={carouselItems} />
        <main>
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {pinnedPosts?.map((post) => (
              <FeaturedPost key={post?.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ my: 3 }}>
            <RecentPost post={recentPost} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </>
  );
};

export default Homepage;
