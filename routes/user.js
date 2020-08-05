const router = require('express').Router();
const userController = require('../controller/userController');
const userRequestController = require('../controller/userRequestController');
const dashboardRouter = require('./dashboard')

router.get('/', userController.home)
router.get('/register', userController.register)
router.get('/login', userController.login)
router.get('/logout', userController.logout)


router.post('/register', userRequestController.register);
router.post('/login', userRequestController.login);
router.post('/addItem', userRequestController.newItem)


//Dashboard router
router.use('/dashboard', dashboardRouter);

//catch error from mistyped URL
router.use((req,res) => res.send(`Error 404: Page does not exisit.`));

module.exports = router;