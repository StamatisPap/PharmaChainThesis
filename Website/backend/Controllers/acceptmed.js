const Trans = require('../Models/TransactionModel')

const acceptmed = (req, res) => {

    const re1 = Trans.findOneAndUpdate({ _id: req.body.Id }, { accepted: true }).then((updatedDoc1) => {
        // console.log("accept")
        res.status(200).send(updatedDoc1);
    }).catch(err => {
        // console.log(err)
    })

};

module.exports = acceptmed;