const express = require('express');
const router = express.Router();

const {
  // navigation,
  blog,
  about,
  contact,
  slider,
  allPosts,
  recentPost,
  postDetails,
  addComment,
  pinnedPosts,
  archives,
  archivesPosts,
  privacyPolicy,
  categories,
} = require('../controllers/publicController');

// router.get('/navigation', navigation);
router.get('/blog', blog);
router.get('/about', about);
router.get('/contact', contact);
router.get('/slider', slider);
router.get('/posts', allPosts);
router.get('/recent-post', recentPost);
router.get('/posts/:id', postDetails);
router.post('/comment/:id', addComment);
router.get('/pinned-posts', pinnedPosts);
router.get('/archives', archives);
router.get('/posts/archives/:yearId/:monthId', archivesPosts);
router.get('/update-policy', privacyPolicy);
router.get('/categories', categories);

module.exports = router;
