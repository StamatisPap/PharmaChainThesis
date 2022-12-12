const Meds = require('../Models/MedsModel')

const destroymed = (req, res) => {

    const sid = req.body.sid;
    const eid = req.body.eid;
    const ids = []

    for(let i = sid;i<=eid;i++){ids.push(i)}

    Meds.deleteMany({id:{$in:ids}})
        
    .then(resu=>{

    res.send("deleted")}
        
    )

}

module.exports = destroymed;