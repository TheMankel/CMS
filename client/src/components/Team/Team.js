import React from 'react';
import { useTheme } from '@mui/material/styles';
import { colors, Skeleton } from '@mui/material';
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

const Team = (props) => {
  const theme = useTheme();
  const { team, loading } = props;

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
                  {loading ? (
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
                  {loading ? (
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
                  {loading ? (
                    <Box
                      mt={2}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                      }}>
                      <Skeleton variant='circular' width={24} height={24} />
                      <Skeleton variant='circular' width={24} height={24} />
                    </Box>
                  ) : (
                    <Box>
                      <IconButton
                        size={'small'}
                        sx={{
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
