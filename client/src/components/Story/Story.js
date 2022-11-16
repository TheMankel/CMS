import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TeamWorkingIllustration from "../../svg/TeamWorking";

const Story = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: "medium",
          }}
          gutterBottom
          color={"textSecondary"}
          align={"center"}
        >
          Our story
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={"h3"}
          gutterBottom
          align={"center"}
        >
          We travel around the world
          <br />
          and blog about it!
        </Box>
        <Typography
          variant={"h6"}
          component={"p"}
          color={"textSecondary"}
          align={"center"}
        >
          We were in every continent on the world and made a movie about it! We
          are also blogging every bit of our life here for five years already.
        </Typography>
        <Box marginTop={3} display={"flex"} justifyContent={"center"}></Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={4}
      >
        <Box height={"100%"} width={"100%"} maxWidth={600}>
          <TeamWorkingIllustration height={"100%"} width={"100%"} />
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: "medium",
          }}
          gutterBottom
          color={"textSecondary"}
          align={"center"}
        >
          As seen on
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent={"center"}>
          {[
            "https://assets.maccarianagency.com/svg/logos/amazon-original.svg",
            "https://assets.maccarianagency.com/svg/logos/netflix-original.svg",
            "https://assets.maccarianagency.com/svg/logos/google-original.svg",
          ].map((item, i) => (
            <Box maxWidth={90} marginTop={2} marginRight={4} key={i}>
              <Box
                component="img"
                height={"100%"}
                width={"100%"}
                src={item}
                alt="..."
                sx={{
                  filter:
                    theme.palette.mode === "dark"
                      ? "brightness(0) invert(0.7)"
                      : "none",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Story;
