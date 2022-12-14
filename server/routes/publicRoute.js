const express = require('express');
const router = express.Router();

const {
  navigation,
  about,
  slider,
} = require('../controllers/publicController');

router.get('/navigation', navigation);
router.get('/about', about);
router.get('/slider', slider);

module.exports = router;
