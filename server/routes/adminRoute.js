const express = require('express');
const router = express.Router();

const { summary, recentUsers } = require('../controllers/adminController');

router.get('/summary', summary);
router.get('/recent-users', recentUsers);

module.exports = router;
