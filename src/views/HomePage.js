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
import { getData } from '../lib/api';

const Homepage = () => {
  const [recentPost, setRecentPost] = useState({});
  const [carouselItems, setCarouselItems] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [archives, setArchives] = useState([]);
  const [socials, setSocials] = useState({});
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [isLoadingPinned, setIsLoadingPinned] = useState(true);
  const [isLoadingArchives, setIsLoadingArchives] = useState(true);
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);

  const sidebar = {
    archives: archives,
    social: [
      { name: 'GitHub', icon: GitHubIcon, url: socials?.github },
      { name: 'Twitter', icon: TwitterIcon, url: socials?.twitter },
      { name: 'Facebook', icon: FacebookIcon, url: socials?.facebook },
      { name: 'Instagram', icon: InstagramIcon, url: socials?.instagram },
    ],
  };

  useEffect(() => {
    getData('recent-post', setRecentPost, setIsLoadingRecent);
    getData('slider', setCarouselItems, setIsLoadingCarousel);
    getData('pinned-posts', setPinnedPosts, setIsLoadingPinned);
    getData('archives', setArchives, setIsLoadingArchives);
    getData('socials', setSocials, setIsLoadingSocial);
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
            <Sidebar
              archives={sidebar.archives}
              social={sidebar.social}
              isLoadingArchives={isLoadingArchives}
              isLoadingSocial={isLoadingSocial}
            />
          </Grid>
        </main>
      </Container>
    </>
  );
};

export default Homepage;
