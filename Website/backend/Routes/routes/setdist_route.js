const express = require("express");
const verifyToken = require('../../Helpers/verifytoken.js')

const  setdist = require("../../Controllers/setdist.js");
const router = express.Router();


router.use(verifyToken)
router.post('/',setdist);
module.exports = router;