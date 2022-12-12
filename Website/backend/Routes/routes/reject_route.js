const express = require('express');
const verifyToken = require('../../Helpers/verifytoken.js')
const router = express.Router()
const user = require("../../Models/UserModel")


router.use(verifyToken)
router.post('/', (req, res) => {

    const re1 = user.findOneAndDelete({ _id: req.body.Id }, { accepted: false }).then((updatedDoc1) => {
        res.status(200).send(updatedDoc1);
    }).catch(err => {
        console.log(err)
    })

});
module.exports = router
