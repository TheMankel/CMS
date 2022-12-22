const express = require('express');
const router = express.Router();

const {
  navigation,
  about,
  slider,
  allPosts,
  postDetails,
  comment,
  pinnedPosts,
  archives,
  archivesPosts,
  updatePolicy,
} = require('../controllers/publicController');

router.get('/navigation', navigation);
router.get('/about', about);
router.get('/slider', slider);
router.get('/posts', allPosts);
router.get('/posts/:id', postDetails);
router.post('/comment/:id', comment);
router.get('/pinned-posts', pinnedPosts);
router.get('/archives', archives);
router.get('/posts/archives/:yearId/:monthId', archivesPosts);
router.get('/update-policy', updatePolicy);

module.exports = router;
