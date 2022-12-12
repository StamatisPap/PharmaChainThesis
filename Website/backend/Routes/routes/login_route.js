const express = require('express');
const  login = require('../../Controllers/login.js');
const router = express.Router();

router.post('/', login)
module.exports = router;