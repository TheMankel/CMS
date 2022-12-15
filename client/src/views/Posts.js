// import React, { useState, useEffect, useMemo } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FeaturedPost from '../components/FeaturedPost/FeaturedPost';
import axios from 'axios';
// import useFirestoreData from '../hooks/useFirestoreData';

const Posts = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  // const { firestoreData } = useFirestoreData('posts');

  const handleChange = (e, value) => {
    setPage(value);
  };

  const count = Math.ceil(posts.length / 4);

  const getData = useCallback(async () => {
    try {
      const data = await axios.get('http://localhost:8000/api/posts');

      const postsData = data?.data?.posts;

      console.log(postsData);

      if (!postsData) return;

      setPosts(postsData.slice((page - 1) * (count + 1), page * (count + 1)));
    } catch (err) {
      console.log(err);
    }
  }, [count, page]);

  useEffect(() => {
    getData();
    console.count();
    // const postsData = firestoreData.posts;
    // console.log(firestoreData.posts);

    // if (!firestoreData.posts) return;
    // setPosts(postsData.slice((page - 1) * (count + 1), page * (count + 1)));
    // }, [firestoreData, count, page]);
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

  // const count = Math.ceil(featuredPosts.length / 4);

  // useEffect(() => {
  //   // setPosts(featuredPosts.slice((page - 1) * (count + 1), page * (count + 1)));
  //   getData();
  // }, [page, featuredPosts, count]);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={6} minHeight={580} sx={{ mt: 1 }}>
        {posts.map((post) => (
          <FeaturedPost
            key={post.title.toLowerCase().replace(' ', '-')}
            post={post}
          />
        ))}
      </Grid>
      <Box margin={3} display={'flex'} justifyContent={'center'}>
        <Stack spacing={2}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </Container>
  );
};

export default Posts;
