const Trans = require('../Models/TransactionModel')

const sell = (req, res) => {

    if (req.body.acc == undefined) {
        res.send().json({ "msg": "login in to meta mask" });
    }
    const username = req.user.userName
    // console.log(req.body.acc);
    const trans = new Trans({

        transid: req.body.tid,
        name: username,
        from: req.body.acc,
        medname: req.body.medname,
        sid: req.body.sid,

        meds: 1
        , dot: Date.now(),

    })
    trans.save()
        .then(

            resu => {
                // console.log(resu); 
                res.status(200).send(resu);
            }
        )
        .catch(err => {
            // console.log(err)
        })

};

module.exports = sell;