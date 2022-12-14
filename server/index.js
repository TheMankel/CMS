const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const contactRoutes = require('./routes/contactRoute');
const adminRoutes = require('./routes/adminRoute');
const publicRoutes = require('./routes/publicRoute');

require('dotenv').config();

// app
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use('/api', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', adminRoutes);
app.use('/api', publicRoutes);

app.listen(port, () =>
  console.log(`Server is running on: http://localhost:${port}`),
);
