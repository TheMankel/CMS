import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FormText = () => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Box
          component={Typography}
          fontWeight={700}
          variant={"h5"}
          gutterBottom
          align={"center"}
        >
          CONTACT US
        </Box>
        <Typography
          variant={"h6"}
          component={"p"}
          color={"textSecondary"}
          align={"center"}
        >
          We would love to talk about how we can help you.
        </Typography>
      </Box>
    </Box>
  );
};

export default FormText;
