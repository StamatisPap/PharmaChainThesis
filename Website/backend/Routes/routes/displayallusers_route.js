const express = require('express');
const user = require("../../Models/UserModel.js")
const router = express.Router()



router.post('/', (req, res) => {

  const re1 = user.find({}).then((updatedDoc1) => {

    res.send(updatedDoc1);
  }).catch(err => {
    console.log(err)
  })


});
module.exports = router
