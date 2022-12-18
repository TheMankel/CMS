import React, { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FeaturedPost from '../components/FeaturedPost/FeaturedPost';
import NoDataFound from './NoDataFound';
import axios from 'axios';

const Posts = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const resPerPage = 4;
  const count = Math.ceil(posts.length / resPerPage);

  const getData = useCallback(async () => {
    setLoading(false);
    try {
      const data = await axios.get('http://localhost:8000/api/posts');

      const postsData = data?.data?.posts;

      // console.log(postsData);

      if (!postsData) return;

      // setPosts(postsData.slice((page - 1) * 4, page * 4));
      setPosts(postsData);
    } catch (err) {
      console.log(err);
    }
    setLoading(true);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // const featuredPosts = useMemo(
  //   () => [
  //     {
  //       title: 'Featured post',
  //       date: 'Nov 12',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Post title',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Featurede poste',
  //       date: 'Nov 12',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Poste titlee',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Poste titleee',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Poste titleee1',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Poste titleee2',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Poste titleee3',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //     {
  //       title: 'Poste titleee4',
  //       date: 'Nov 11',
  //       description:
  //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //       image: 'https://source.unsplash.com/random',
  //       imageLabel: 'Image Text',
  //     },
  //   ],
  //   [],
  // );

  return (
    <Container maxWidth='lg'>
      {loading && count > 0 && (
        <Box>
          <Grid
            container
            spacing={6}
            minHeight={count > 2 ? 580 : 240}
            sx={{ mt: 1 }}>
            {posts
              ?.slice((page - 1) * resPerPage, page * resPerPage)
              ?.map((post) => (
                <FeaturedPost
                  key={post?.title?.toLowerCase()?.replace(' ', '-')}
                  post={post}
                />
              ))}
          </Grid>
          <Box margin={3} display={'flex'} justifyContent={'center'}>
            <Stack spacing={2}>
              <Pagination count={count} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </Box>
      )}
      {loading && !count && (
        <NoDataFound message='Looks like no posts were found.' />
      )}
    </Container>
  );
};

export default Posts;
