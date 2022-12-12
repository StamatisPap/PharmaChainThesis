const Trans = require('../Models/TransactionModel')

const setdist = (req, res) => {
    const username = req.user.userName
    if (req.body.acc == undefined) {
        res.send().json({ "msg": "login in to meta mask" });
    }
    console.log(req.body.acc);
    const trans = new Trans({
        medname: req.body.medname,
        transid: req.body.tid,
        name: username,
        from: req.body.acc,
        to: req.body.to,
        Toname: req.body.toname,
        sid: req.body.sid,
        eid: req.body.eid,
        meds: req.body.eid - req.body.sid + 1
        , dot: Date.now(),
        accepted: false


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


module.exports = setdist;