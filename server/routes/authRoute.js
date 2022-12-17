const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  // navigation,
  // about,
  // slider,
  deleteUser,
  updateUserPhoto,
} = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
// router.get('/navigation', navigation);
// router.get('/about', about);
// router.get('/slider', slider);
router.post('/delete-user', deleteUser);
router.post('/update-user-photo', updateUserPhoto);

module.exports = router;
