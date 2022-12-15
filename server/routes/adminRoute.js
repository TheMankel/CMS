const express = require('express');
const router = express.Router();

const {
  summary,
  recentUsers,
  newPost,
} = require('../controllers/adminController');

router.get('/summary', summary);
router.get('/recent-users', recentUsers);
router.post('/new-post', newPost);

module.exports = router;
