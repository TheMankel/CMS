import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Story from '../components/Story/Story';
import Team from '../components/Team/Team';
import { getData } from '../lib/api';

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
  const [isLoading, setLoading] = useState(true);

  const handleData = (data) => {
    setPrimaryText(data?.story.primary);
    setSecondaryText(data?.story.secondary);
    setTeam(data?.team);
  };

  useEffect(() => {
    getData('about', handleData, setLoading);
  }, []);

  return (
    <>
      <Box my={3}>
        <Story
          primaryText={primaryText}
          secondaryText={secondaryText}
          isLoading={isLoading}
        />
      </Box>
      <Divider />
      <Box my={3}>
        <Team team={team} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default About;
