const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const wordRouter = require('./controllers/words.js');
const JWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);


mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});




// Routes go here
app.use('/words', wordRouter)
app.use('/auth', JWTRouter);
app.use('/users', usersRouter);

app.listen(3002, () => {
  console.log('The express app is ready!');
});