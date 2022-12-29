import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FeaturedCard from '../components/FeaturedCard/FeaturedCard';
import NoDataFound from './NoDataFound';
// import axios from 'axios';
import { getData } from '../lib/api';

const Posts = () => {
  const { yearId = '', monthId = '' } = useParams();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url =
    monthId === '' && yearId === ''
      ? 'posts'
      : `posts/archives/${yearId}/${monthId}`;

  const resPerPage = 4;
  const count = Math.ceil(posts.length / resPerPage) || 1;

  const handleChange = (e, value) => {
    setPage(value);
  };

  // const getData = useCallback(async () => {
  //   setIsLoading(false);
  //   try {
  //     const res = await axios.get(`http://localhost:8000/api/${url}`);
  //     const { data } = res;

  //     // const postsData = data?.posts;

  //     if (!data) return;

  //     setPosts(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setIsLoading(true);
  // }, [url]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  useEffect(() => {
    getData(url, setPosts, setIsLoading);
  }, [url]);

  return (
    <Container maxWidth='lg'>
      {
        <Box>
          <Grid
            container
            spacing={6}
            minHeight={count > 2 ? 580 : 240}
            sx={{ mt: 1 }}>
            {!isLoading &&
              posts
                ?.slice((page - 1) * resPerPage, page * resPerPage)
                ?.map((post) => (
                  <FeaturedCard
                    key={post?.title?.toLowerCase()?.replace(' ', '-')}
                    item={post}
                    url='/posts/'
                    text='Continue reading...'
                  />
                ))}
            {isLoading && (
              <>
                <FeaturedCard
                  item={{ title: '', date: '', description: '' }}
                  isLoading={isLoading}
                />
                <FeaturedCard
                  item={{ title: '', date: '', description: '' }}
                  isLoading={isLoading}
                />
              </>
            )}
          </Grid>
          <Box margin={3} display={'flex'} justifyContent={'center'}>
            <Stack spacing={2}>
              <Pagination count={count} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </Box>
      }
      {!isLoading && !count && (
        <NoDataFound message='Looks like no posts were found.' />
      )}
    </Container>
  );
};

export default Posts;
