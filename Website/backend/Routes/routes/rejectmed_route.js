const express = require('express');
const  rejectmed = require('../../Controllers/rejectmed.js');
const verifyToken = require('../../Helpers/verifytoken.js')
const router = express.Router()


router.use(verifyToken)
router.post('/', rejectmed);
module.exports = router