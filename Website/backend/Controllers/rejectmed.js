const Trans = require('../Models/TransactionModel')

const rejectmed = (req, res) => {
    const re1 = Trans.findOneAndDelete({ _id: req.body.Id }, { accepted: false }).then((updatedDoc1) => {
        //res.status(200).send(updatedDoc1);
        const username = req.user.userName
        const trans = new Trans({

            transid: req.body.tid,
            name: username,
            from: updatedDoc1.to,
            to: updatedDoc1.from,
            sid: req.body.sid,
            eid: req.body.eid,
            medname: req.body.medname,
            medlist: req.body.medlist
            , dot: Date.now(),
            accepted: false,
            Toname: updatedDoc1.name,
            exp: updatedDoc1.exp
            , meds: req.body.medlist.length,
            msg: 'Your has been declined by the reciever'

        })
        trans.save()
            .then(
                resu => {
                    res.status(200).send(resu);
                }
            )
            .catch(err => {
                 console.log(err)
            })

    }).catch(err => {
        console.log(err)
    })

};

module.exports = rejectmed;