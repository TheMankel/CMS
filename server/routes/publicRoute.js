const express = require('express');
const router = express.Router();

const {
  navigation,
  about,
  slider,
  allPosts,
  postDetails,
  comment,
} = require('../controllers/publicController');

router.get('/navigation', navigation);
router.get('/about', about);
router.get('/slider', slider);
router.get('/posts', allPosts);
router.get('/posts/:id', postDetails);
router.post('/comment/:id', comment);

module.exports = router;
