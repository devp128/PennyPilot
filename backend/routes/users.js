const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/health', usersController.health);

module.exports = router;
