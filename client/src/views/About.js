import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Story from '../components/Story/Story';
import Team from '../components/Team/Team';
// import axios from 'axios';

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
      // const data = await axios.get('http://localhost:8000/api/navigation');
      setPrimaryText('We travel around the world and blog about it!');
      setSecondaryText(
        'We were in every continent on the world and made a movie about it! We are also blogging every bit of our life here for five years already.',
      );
      setAuthors([
        {
          name: 'Jankos',
          title: 'Senior',
          avatar:
            'https://play-lh.googleusercontent.com/O8mvDQlw4AwmGfUrh4lviZD_PwwhRHz2etA25F77SbXrm3qEHOt2826aNkKar4D0yw',
          about:
            'I am an ambitious workaholic, but apart from that, pretty simple person.',
        },
        {
          name: 'Wojtas',
          title: 'Kozak',
          avatar:
            'https://wi.wallpapertip.com/wsimgs/10-107567_cat-wallpaper-funny-cat-desktop.jpg',
          about:
            'I am non ambitious workaholic, but apart from that, pretty complicated person.',
        },
      ]);
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
