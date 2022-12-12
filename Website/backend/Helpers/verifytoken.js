const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = function (req, res, next) {

    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        // console.log(bearer)
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        jwt.verify(req.token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });

            } else {
                req.user = decoded;
                return next()
            }
        });

    }
    else {
        res.send("No header")
    }
}

