const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  deleteUser,
  updateUserPhoto,
} = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/delete-user', deleteUser);
router.post('/update-user-photo', updateUserPhoto);

module.exports = router;
