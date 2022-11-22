const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  navigation,
  about,
} = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/navigation', navigation);
router.get('/about', about);

module.exports = router;
