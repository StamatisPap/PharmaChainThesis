const Trans = require('../Models/TransactionModel')
const Meds = require('../Models/MedsModel')

const addmeds = (req, res) => {
    const username = req.user.userName
    if (req.body.acc == undefined) {
        res.send().json({ "msg": "login in to meta mask" });
    }
    // console.log(req.body.acc);
    const trans = new Trans({

        transid: req.body.tid,
        name: username,
        from: req.body.acc,
        to: req.body.to,
        sid: req.body.sid,
        eid: req.body.eid,
        medlist: req.body.medlist
        , dot: Date.now(),
        accepted: false,
        Toname: req.body.toname,
        exp: req.body.exp
        , meds: req.body.medlist.length,
        medname: req.body.name

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

    for (i = req.body.sid; i <= req.body.eid; i++) {
        const meds = new Meds({


            Name: req.body.name,
            Manufacture: username,
            address: req.body.acc,
            expiry: req.body.exp,
            id: i


        })
        meds.save()
            .then(

                resu => {
                    // console.log(resu);
                    res.status(200).send(resu);
                }
            )
            .catch(err => {
                // console.log(err)
            })
    }

};

module.exports = addmeds;
