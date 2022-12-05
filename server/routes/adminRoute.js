const express = require('express');
const router = express.Router();

const { summary } = require('../controllers/adminController');

router.get('/summary', summary);

module.exports = router;
