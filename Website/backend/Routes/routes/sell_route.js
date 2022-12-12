const express = require('express');
const sell = require('../../Controllers/sell.js');
const verifyToken = require('../../Helpers/verifytoken.js')
const router = express.Router()


router.use(verifyToken)
router.post('/', sell);
module.exports = router