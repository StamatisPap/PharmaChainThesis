const express = require('express');
const verifyToken = require('../../Helpers/verifytoken.js')
const router = express.Router()
const Trans = require('../../Models/TransactionModel.js')

router.use(verifyToken)
router.post('/', (req, res) => {
    
    const re1 = Trans.find({ to: req.body.acc, Toname: req.body.name, meds: { $ne: 0 } }).then((updatedDoc1) => {
        res.status(200).send(updatedDoc1);
    }).catch(err => {
        console.log(err)
    })

});
module.exports = router
