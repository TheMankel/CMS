const admin = require('firebase-admin');

require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(process.env.SERVICE_ACCOUNT_KEY),
  databaseURL: process.env.DATABASE,
});
const db = admin.firestore();

module.exports = db;
