const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const { join, login } = require('../controller/userController');

router.post('/join', join);
router.post('/login', login);

module.exports = router;
