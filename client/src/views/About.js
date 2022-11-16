import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Headline from "../components/Headline/Headline";
import Numbers from "../components/Numbers/Numbers";
import Story from "../components/Story/Story";
import Team from "../components/Team/Team";
import MainPublic from "../layouts/MainPublic";

const About = () => {
  return (
    <MainPublic>
      <Box my={3}>
        <Headline />
      </Box>
      <Divider />
      <Box my={3}>
        <Story />
        <Box my={3}>
          <Numbers />
          <Box my={3}>
            <Divider />
          </Box>
        </Box>
      </Box>
      <Box my={3}>
        <Team />
      </Box>
    </MainPublic>
  );
};

export default About;
