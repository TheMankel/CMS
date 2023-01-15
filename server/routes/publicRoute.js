const express = require('express');
const router = express.Router();

const {
  blog,
  about,
  contact,
  updateSubscribe,
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
  categoriesPosts,
  socials,
  checkSubscribe,
} = require('../controllers/publicController');

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
router.get('/privacy-policy', privacyPolicy);
router.get('/categories', categories);
router.get('/posts/categories/:categoryId', categoriesPosts);
router.get('/socials', socials);
router.get('/checkSubscribe', checkSubscribe);
router.post('/subscribe', updateSubscribe);

module.exports = router;
