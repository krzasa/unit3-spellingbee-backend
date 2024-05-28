const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const wordRouter = require('./controllers/words.js');
const JWTRouter = require('./controllers/test-jwt');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());





// Routes go here
app.use('/words', wordRouter)
app.use('/auth', JWTRouter);

app.listen(3002, () => {
  console.log('The express app is ready!');
});