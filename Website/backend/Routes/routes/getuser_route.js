const express = require('express');
const verifyToken = require('../../Helpers/verifytoken.js')
const user = require("../../Models/UserModel.js")
const router = express.Router()



router.use(verifyToken)
router.post('/', (req, res) => {

    const username = req.user.userName

    const re1 = user.find({ userName: username }).then((updatedDoc1) => {
        res.send({ typeofuser: updatedDoc1[0].typeofuser, userName: username, address: updatedDoc1[0].address, accepted: updatedDoc1[0].accepted, name: updatedDoc1[0].name });
    }).catch(err => {
        console.log(err)
    })

});
module.exports = router
