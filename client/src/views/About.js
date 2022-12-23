import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Story from '../components/Story/Story';
import Team from '../components/Team/Team';
import axios from 'axios';

const About = () => {
  const [primaryText, setPrimaryText] = useState('');
  const [secondaryText, setSecondaryText] = useState('');
  const [team, setTeam] = useState([
    {
      name: '',
      title: '',
      avatar: '',
      about: '',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/about');
      const data = res?.data;

      // setPrimaryText(data?.data.storyText.primary);
      // setSecondaryText(data?.data.storyText.secondary);

      setPrimaryText(data?.story.primary);
      setSecondaryText(data?.story.secondary);
      setTeam(data?.team);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box my={3}>
        <Story
          primaryText={primaryText}
          secondaryText={secondaryText}
          loading={loading}
        />
      </Box>
      <Divider />
      <Box my={3}>
        <Team team={team} loading={loading} />
      </Box>
    </>
  );
};

export default About;
