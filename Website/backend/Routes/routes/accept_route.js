const express = require('express');
const  accept = require('../../Controllers/accept.js');
const verifyToken = require('../../Helpers/verifytoken.js');
const router = express.Router()

router.use(verifyToken)
router.post('/', accept);
module.exports = router
