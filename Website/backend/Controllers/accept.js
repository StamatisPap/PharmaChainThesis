const user = require("../Models/UserModel")

const accept =  (req, res) => {
    const re1 = user.findOneAndUpdate({ _id: req.body.Id }, { accepted: true }).then((updatedDoc1) => {
        // console.log("accept")
        res.status(200).send(updatedDoc1);
    }).catch(err => {
        // console.log(err)
    })

};

module.exports = accept