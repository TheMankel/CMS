const express = require('express');
const router = express.Router();

const { signUp, signIn, navigation } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/navigation', navigation);

module.exports = router;
