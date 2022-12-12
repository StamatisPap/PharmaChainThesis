const express = require('express');
const verifyToken = require('../../Helpers/verifytoken.js')
const router = express.Router()
const  acceptmed = require('../../Controllers/acceptmed.js');

router.use(verifyToken);
router.post('/', acceptmed);
module.exports = router
