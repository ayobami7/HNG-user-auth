const express = require('express');
const { body, validationResult } = require('express-validator');
const Organisation = require('../models/Organisation');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const organisations = await Organisation.findAll({ where: { userId: req.user.userId } });
    res.status(200).json({
      status: 'success',
      message: 'Organisations fetched successfully',
      data: { organisations },
    });
  } catch (err) {
    res.status(400).json({ status: 'Bad request', message: 'Error fetching organisations', statusCode: 400 });
  }
});

router.post(
  '/',
  auth,
  [
    body('name').notEmpty().withMessage('Name is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const organisation = await Organisation.create({
        orgId: require('uuid').v4(),
        name,
        description,
        userId: req.user.userId,
      });

      res.status(201).json({
        status: 'success',
        message: 'Organisation created successfully',
        data: {
          orgId: organisation.orgId,
          name: organisation.name,
          description: organisation.description,
        },
      });
    } catch (err) {
      res.status(400).json({ status: 'Bad request', message: 'Organisation creation unsuccessful', statusCode: 400 });
    }
  }
);

module.exports = router;