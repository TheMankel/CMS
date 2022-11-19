import React from 'react';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Team = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}>
          Our team
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          align={'center'}>
          Trust the best bloggers!
        </Box>
      </Box>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        {[
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
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              component={Card}
              borderRadius={3}
              boxShadow={2}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}>
              <CardContent>
                <Box
                  component={Avatar}
                  src={item.avatar}
                  height={80}
                  width={80}
                />
                <Box marginTop={4}>
                  <ListItemText primary={item.name} secondary={item.title} />
                  <Typography variant={'subtitle2'} color={'textSecondary'}>
                    {item.about}
                  </Typography>
                  <Box marginTop={4}>
                    <IconButton
                      size={'small'}
                      sx={{
                        marginRight: 1,
                        color: colors.blueGrey[200],
                      }}>
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      size={'small'}
                      sx={{
                        color: colors.blueGrey[200],
                      }}>
                      <TwitterIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
