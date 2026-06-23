const express = require('express');

const router = express.Router();
const { registeruser, loginUser } = require('../Controller/ShortUrlUser')

router.post('/register', registeruser);
router.post('/login', loginUser);

module.exports = router;

