const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as necessary

// Middleware to parse JSON bodies
router.use(express.json());

// Add in constant for the number
const SALT_LENGTH = 12;
// Signup route
router.post('/signup', async (req, res) => {
    console.log(req.body.password);
    
    try {
      // Check if the username is already taken
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.json({ error: 'Username already taken.' });
      }
      // Create a new user with hashed password
      const user = await User.create({
        username: req.body.username,
        password: await bcrypt.hashSync(req.body.password, SALT_LENGTH),
        
      });
      console.log(user);
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
    //   console.log(user);
    //   console.log(user.password);
      console.log(req.body.password);  // test7
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.JWT_SECRET
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;