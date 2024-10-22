const express = require('express');
const { signUp, login, logout, authenticate } = require('../controllers/authControllers');
const router = express.Router();

router.get('/', authenticate);
router.post('/signup', signUp);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;