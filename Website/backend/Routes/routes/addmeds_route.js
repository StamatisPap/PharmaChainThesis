const express = require("express");
const verifyToken = require('../../Helpers/verifytoken.js')
const addmeds = require("../../Controllers/addmeds.js");
const router = express.Router();

router.use(verifyToken)
router.post('/', addmeds);
module.exports = router;
