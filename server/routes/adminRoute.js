const express = require('express');
const router = express.Router();

const {
  summary,
  recentUsers,
  newPost,
  editPost,
  deletePost,
  updateBlog,
  updatePinnedPosts,
  updateSlider,
} = require('../controllers/adminController');

router.get('/summary', summary);
router.get('/recent-users', recentUsers);
router.post('/new-post', newPost);
router.post('/edit-post', editPost);
router.post('/delete-post', deletePost);
router.post('/update-blog', updateBlog);
router.post('/update-pinned-posts', updatePinnedPosts);
router.post('/slider/:id', updateSlider);

module.exports = router;
