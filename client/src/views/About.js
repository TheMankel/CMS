import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "../components/Container/Container";
import Headline from "../components/Headline/Headline";
import Numbers from "../components/Numbers/Numbers";
import Story from "../components/Story/Story";
import Team from "../components/Team/Team";

const About = () => {
  return (
    <Box>
      <Container>
        <Headline />
      </Container>
      <Divider />
      <Container paddingY={"0 !important"} marginTop={5}>
        <Story />
        <Container>
          <Numbers />
          <Container>
            <Divider />
          </Container>
        </Container>
      </Container>
      <Container paddingTop={"0 !important"}>
        <Team />
      </Container>
    </Box>
  );
};

export default About;
