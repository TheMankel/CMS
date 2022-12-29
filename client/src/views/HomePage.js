import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Sidebar from '../components/Sidebar/Sidebar';
import Slider from '../components/Slider/Slider';
import RecentPost from '../components/RecentPost/RecentPost';
import FeaturedCard from '../components/FeaturedCard/FeaturedCard';
// import axios from 'axios';
import { getData } from '../lib/api';

const Homepage = () => {
  const [recentPost, setRecentPost] = useState({});
  const [carouselItems, setCarouselItems] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [archives, setArchives] = useState([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [isLoadingPinned, setIsLoadingPinned] = useState(true);
  const [isLoadingArchives, setIsLoadingArchives] = useState(true);

  const sidebar = {
    // archives: [
    //   { title: 'March 2020', url: 'dec/2022' },
    //   { title: 'February 2020', url: '#' },
    //   { title: 'January 2020', url: '#' },
    //   { title: 'November 1999', url: '#' },
    //   { title: 'October 1999', url: '#' },
    //   { title: 'September 1999', url: '#' },
    //   { title: 'August 1999', url: '#' },
    //   { title: 'July 1999', url: '#' },
    //   { title: 'June 1999', url: '#' },
    //   { title: 'May 1999', url: '#' },
    //   { title: 'April 1999', url: '#' },
    // ],
    archives: archives,
    social: [
      { name: 'GitHub', icon: GitHubIcon, url: '' },
      { name: 'Twitter', icon: TwitterIcon, url: '' },
      { name: 'Facebook', icon: FacebookIcon, url: '' },
      { name: 'Instagram', icon: InstagramIcon, url: '' },
    ],
  };

  // const getData = useCallback(async () => {
  //   try {
  //     const postsRes = await axios.get('http://localhost:8000/api/posts');
  //     const sliderRes = await axios.get('http://localhost:8000/api/slider');
  //     const pinnedPostsRes = await axios.get(
  //       'http://localhost:8000/api/pinned-posts',
  //     );
  //     const archivesRes = await axios.get('http://localhost:8000/api/archives');

  //     const postsData = postsRes?.data;
  //     const sliderData = sliderRes?.data;
  //     const pinnedPostsData = pinnedPostsRes?.data;
  //     const archivesData = archivesRes?.data;

  //     const recentPostData = postsData.pop();

  //     setRecentPost(recentPostData);
  //     setCarouselItems(sliderData);
  //     setPinnedPosts(pinnedPostsData);
  //     setArchives(archivesData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  useEffect(() => {
    getData('recent-post', setRecentPost, setIsLoadingRecent);
    getData('slider', setCarouselItems, setIsLoadingCarousel);
    getData('pinned-posts', setPinnedPosts, setIsLoadingPinned);
    getData('archives', setArchives, setIsLoadingArchives);
  }, []);

  return (
    <>
      <Container maxWidth='lg'>
        <Slider items={carouselItems} isLoading={isLoadingCarousel} />
        <main>
          <Grid container spacing={4} sx={{ mt: 1 }}>
            {pinnedPosts?.map((post) => (
              <FeaturedCard
                key={post?.title}
                item={post}
                url='/posts/'
                text='Continue reading...'
                isLoading={isLoadingPinned}
              />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ my: 3 }}>
            <RecentPost post={recentPost} isLoading={isLoadingRecent} />
            <Sidebar archives={sidebar.archives} social={sidebar.social} />
          </Grid>
        </main>
      </Container>
    </>
  );
};

export default Homepage;
