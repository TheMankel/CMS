import React from 'react';

import StoryTabPanel from './StoryTabPanel';
import TeamTabPanel from './TeamTabPanel';

const AboutTabPanel = (props) => {
  const { value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`about-tabpanel-${index}`}
      aria-labelledby={`about-tab-${index}`}
      {...other}>
      {value === 0 && <StoryTabPanel />}
      {value === 1 && <TeamTabPanel />}
    </div>
  );
};

export default AboutTabPanel;
