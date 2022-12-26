import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FeaturedCard from '../components/FeaturedCard/FeaturedCard';
import NoDataFound from './NoDataFound';
import { getData } from '../lib/api';

const Categories = () => {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const resPerPage = 4;
  const count = Math.ceil(categories.length / resPerPage);

  const handleChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    getData('categories', setCategories, setLoading);
  }, []);

  return (
    <Container maxWidth='lg'>
      {!loading && count > 0 && (
        <Box>
          <Grid
            container
            spacing={6}
            minHeight={count > 2 ? 580 : 240}
            sx={{ mt: 1 }}>
            {categories
              ?.slice((page - 1) * resPerPage, page * resPerPage)
              ?.map((category) => (
                <FeaturedCard
                  key={category?.title?.toLowerCase()?.replace(' ', '-')}
                  item={category}
                  url='/posts/category/'
                  text='Show posts...'
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
      {!loading && !count && (
        <NoDataFound message='Looks like no categories were found.' />
      )}
    </Container>
  );
};

export default Categories;
