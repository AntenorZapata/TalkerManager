const express = require('express');
const { login } = require('../controllers/loginController');
const {
  verifyEmail,
  verifyPassword,
} = require('../middleware/verifyCredentials');

const router = express.Router();

router.route('/').post(verifyEmail, verifyPassword, login);

module.exports = router;
