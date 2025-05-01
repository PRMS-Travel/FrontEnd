const express = require('express');
const router = express.Router();
const { userValidator } = require('../middleware/validator');

const { join, login } = require('../controller/userController');

router.post('/join', userValidator, join);
router.post('/login', userValidator, login);

module.exports = router;
