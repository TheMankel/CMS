import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Story from '../components/Story/Story';
import Team from '../components/Team/Team';
import axios from 'axios';

const About = () => {
  const [primaryText, setPrimaryText] = useState('');
  const [secondaryText, setSecondaryText] = useState('');
  const [authors, setAuthors] = useState([
    {
      name: '',
      title: '',
      avatar: '',
      about: '',
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await axios.get('http://localhost:8000/api/about');
      const avatars = [
        'https://play-lh.googleusercontent.com/O8mvDQlw4AwmGfUrh4lviZD_PwwhRHz2etA25F77SbXrm3qEHOt2826aNkKar4D0yw',
        'https://wi.wallpapertip.com/wsimgs/10-107567_cat-wallpaper-funny-cat-desktop.jpg',
      ];
      // console.log(data);
      setPrimaryText(data?.data.storyText.primary);
      setSecondaryText(data?.data.storyText.secondary);

      const authorsData = [...data?.data.team];
      authorsData.forEach((author, i) => (author.avatar = avatars[i]));

      setAuthors(authorsData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box my={3}>
        <Story primaryText={primaryText} secondaryText={secondaryText} />
      </Box>
      <Divider />
      <Box my={3}>
        <Team authors={authors} />
      </Box>
    </>
  );
};

export default About;
