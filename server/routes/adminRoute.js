const express = require('express');
const router = express.Router();

const {
  summary,
  recentUsers,
  newPost,
  editPost,
  deletePost,
  updateNameLogo,
} = require('../controllers/adminController');

router.get('/summary', summary);
router.get('/recent-users', recentUsers);
router.post('/new-post', newPost);
router.post('/edit-post', editPost);
router.post('/delete-post', deletePost);
router.post('/new-name-logo', updateNameLogo);

module.exports = router;
