const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

require('dotenv').config();

// app
const app = express();
const port = process.env.PORT || 8000;

// db
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE,
});
const db = admin.firestore();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.get('/users', async (req, res) => {
  try {
    const usersRef = await db.collection('users').get();

    usersRef.forEach((user) => {
      console.log(user.data());
      res.send(user.data());
    });
  } catch (err) {
    res.send(err);
  }
});

app.get('/api/:message', (req, res) => {
  res.json({
    message: `Your message is received ${req.params.message}`,
  });
});

app.listen(port, () =>
  console.log(`Server is running on: http://localhost:${port}`),
);
