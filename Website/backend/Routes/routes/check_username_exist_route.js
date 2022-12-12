const express = require('express');
const router = express.Router()
const user = require("../../Models/UserModel.js")


router.post('/', (req, res) => {

    const re1 = user.find({ userName: req.body.username }).then((updatedDoc1) => {

        res.status(200).send(updatedDoc1);
    }).catch(err => {
        console.log(err)
    })

});
module.exports = router
