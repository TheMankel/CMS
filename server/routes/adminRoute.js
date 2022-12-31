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
  users,
  updateUser,
  deleteUser,
  updatePolicy,
  updateContact,
  updateStory,
  updateTeam,
  editTeam,
  deleteTeam,
} = require('../controllers/adminController');

router.get('/summary', summary);
router.get('/recent-users', recentUsers);
router.post('/new-post', newPost);
router.post('/edit-post', editPost);
router.post('/delete-post', deletePost);
router.post('/update-blog', updateBlog);
router.post('/update-policy', updatePolicy);
router.post('/update-pinned-posts', updatePinnedPosts);
router.post('/slider/:id', updateSlider);
router.get('/users/:id', users);
router.post('/update-user/:id', updateUser);
router.get('/delete-user/:id', deleteUser);
router.post('/update-contact', updateContact);
router.post('/update-about-story', updateStory);
router.post('/update-about-team', updateTeam);
router.post('/edit-about-team', editTeam);
router.post('/delete-about-team', deleteTeam);

module.exports = router;
