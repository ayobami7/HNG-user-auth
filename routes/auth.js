const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organisation = require('../models/Organisation');

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phone } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(422).json({ errors: [{ field: 'email', message: 'Email already exists' }] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        userId: require('uuid').v4(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      });

      const organisation = await Organisation.create({
        orgId: require('uuid').v4(),
        name: `${firstName}'s Organisation`,
        description: `${firstName}'s default organisation`,
      });

      const token = jwt.sign({ userId: user.userId, email: user.email }, 'secretkey', { expiresIn: '1h' });

      res.status(201).json({
        status: 'success',
        message: 'Registration successful',
        data: {
          accessToken: token,
          user: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
        },
      });
    } catch (err) {
      res.status(400).json({ status: 'Bad request', message: 'Registration unsuccessful', statusCode: 400 });
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
    }

    const token = jwt.sign({ userId: user.userId, email: user.email }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Bad request', message: 'Login unsuccessful', statusCode: 400 });
  }
});

module.exports = router;