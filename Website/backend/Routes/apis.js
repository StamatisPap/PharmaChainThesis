const express = require('express');
const router = express.Router();

router.use('/login', require('./routes/login_route.js'))
router.use('/signup/', require('./routes/signup_route.js'))
router.use('/getuser/', require('./routes/getuser_route.js'))
router.use('/getalluser/', require('./routes/getalluser_route.js'))
router.use('/displayallusers/', require('./routes/displayallusers_route.js'))
router.use('/addmed/', require('./routes/addmeds_route.js'))
router.use('/getnotifs/', require('./routes/getnotification_route.js'))
router.use('/gettrans/', require('./routes/gettransaction_route.js'))
router.use('/accept/', require('./routes/accept_route.js'))
router.use('/reject/', require('./routes/reject_route.js'))
router.use('/acceptmeds/', require('./routes/acceptmed_route.js'))
router.use('/rejectmeds/', require('./routes/rejectmed_route.js'))
router.use('/setdist/', require('./routes/setdist_route.js'))
router.use('/updatenot/', require('./routes/updatenot_route.js'))
router.use('/sell/', require('./routes/sell_route.js'))
router.use('/givemaxeid/', require('./routes/givemaxeid_route.js'))
router.use('/checkforusername/', require('./routes/check_username_exist_route.js'))
router.use('/destroymed/', require('./routes/destroymed_route.js'))

module.exports = router
