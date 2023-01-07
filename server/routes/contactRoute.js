const express = require('express');
const router = express.Router();

const { contact, subscription } = require('../controllers/contactController');

router.post('/contact', contact);
router.post('/send-subscriptions', subscription);

module.exports = router;
