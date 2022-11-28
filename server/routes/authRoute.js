const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  navigation,
  about,
  slider,
  deleteUser,
} = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/navigation', navigation);
router.get('/about', about);
router.get('/slider', slider);
router.post('/delete-user', deleteUser);

module.exports = router;
