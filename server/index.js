const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoute');

require('dotenv').config();

// app
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', authRoutes);

app.listen(port, () =>
  console.log(`Server is running on: http://localhost:${port}`),
);
