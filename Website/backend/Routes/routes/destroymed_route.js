const express = require('express');
const destroymed = require('../../Controllers/destroymed.js');
const verifyToken = require('../../Helpers/verifytoken.js');
const router = express.Router()

router.use(verifyToken)
router.post('/', destroymed);
module.exports = router