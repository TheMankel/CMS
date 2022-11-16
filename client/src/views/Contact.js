import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Form from "../components/Form/Form";
import MainPublic from "../layouts/MainPublic";
import FormText from "../components/Form/FormText";

const Contact = () => {
  return (
    <MainPublic>
      <Box my={3}>
        <FormText />
      </Box>
      <Grid align="center" spacing={24}>
        <Grid my={5} container direction="column" maxWidth={"60vh"}>
          <Form />
        </Grid>
      </Grid>
    </MainPublic>
  );
};

export default Contact;
