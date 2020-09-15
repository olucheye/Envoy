/**
* @file: Router for user actions.
*/

const router = require('express').Router();
const {landingPage,
      register,
      login,
      home,
      createUser,
      addToCart,
      allCart,
      findItemInCart,
      updateItemInCart,
      removeFromCart,
      itemById} = require('../controller/userController');


//GET Route(Read)
router.get('/', landingPage) //returns homepage
router.get('/register', register) //returns register page
router.get('/login', login) // returns log in page
router.get('/home', home) //displays user dashboard

//POST,PUT & DELETE(User actions)
router.post('/signUp', createUser); //creates a new user account
router.post('/additem', addToCart); // adds new item to user wishlist
router.get('/orders', allCart); //gets all items added by user

router.get('/orders/:id', findItemInCart)
router.put('/updateItem/:id', updateItemInCart)
router.delete('/removeItem/:id', removeFromCart)

//param search
router.param('id', itemById);

module.exports = router;