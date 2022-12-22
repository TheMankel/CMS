import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FeaturedPost from '../components/FeaturedPost/FeaturedPost';
import NoDataFound from './NoDataFound';
import axios from 'axios';

const PostsArchives = () => {
  const { yearId, monthId } = useParams();
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
      console.log(yearId, monthId);
      const data = await axios.get(
        `http://localhost:8000/api/posts/archives/${yearId}/${monthId}`,
      );

      const postsData = data?.data?.posts;

      if (!postsData) return;

      setPosts(postsData);
    } catch (err) {
      console.log(err);
    }
    setLoading(true);
  }, [yearId, monthId]);

  useEffect(() => {
    getData();
  }, [getData]);

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

export default PostsArchives;
