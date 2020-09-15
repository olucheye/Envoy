/**
* @file: Router for all user dashboard actions.
*
*/

const router = require('express').Router();
const authCtrl = require('../controller/authController')


router.post('/signin', authCtrl.login);
router.get('/logout', authCtrl.logout);



module.exports = router;