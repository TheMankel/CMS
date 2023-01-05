import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const Team = (props) => {
  const theme = useTheme();
  const { team, isLoading } = props;

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
        {team.map((item, i) => (
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
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  height: '320px',
                }}>
                <Box align={'center'}>
                  {isLoading ? (
                    <Skeleton variant='circular'>
                      <Avatar sx={{ height: 80, width: 80 }} />
                    </Skeleton>
                  ) : (
                    <Avatar
                      alt='User Avatar'
                      src={item.avatar}
                      sx={{ height: 80, width: 80 }}
                    />
                  )}
                </Box>
                <Box align={'center'}>
                  {isLoading ? (
                    <Box>
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </Box>
                  ) : (
                    <>
                      <ListItemText
                        primary={item.name}
                        secondary={item.title}
                      />
                      <Typography
                        variant={'subtitle2'}
                        color={'textSecondary'}
                        gutterBottom>
                        {item.about}
                      </Typography>
                    </>
                  )}
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
