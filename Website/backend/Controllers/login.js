const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");

const login = (req, res) => {
  // console.log(req.body)
  const username = req.body.userName;
  const password = req.body.password;
  // console.log(username, password)
  if (username == undefined || username == null) {
    res.sendStatus(400);
  }
  if (password == undefined || password == null) {
    res.sendStatus(400);
  }

  const results = User.findOne({ userName: username });

  results.then((user) => {
    //console.log(user);
    const result = user.password;
    // console.log(result)
    if (result == undefined || result == null) res.sendStatus(400);

    bcrypt
      .compare(password, result)
      .then(function (ress) {
        if (ress == true) {
          const payload = {
            userName: username,
            isAdmin: user.isAdmin,
          };
          var token = jwt.sign(payload, config.secret, {
            expiresIn: "1440m", // expires in 24 hours
          });
          // console.log(req.body)
          res.status(200).json({ msg: "Login Success", token: token });
          return;
        } else if (ress == false) {
          res.sendStatus(400);
          return;
        }
      })
      .catch((err) => {
        // console.log(err)
      });
  });
};

module.exports = login;
