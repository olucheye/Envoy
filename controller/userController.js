/**
 * @file: Controller Class that handles the routing to ejs views on Web
 * @action GET Requests to web routes
 */

 const userService = require('../services/userService');
 
class userController {
   //homepage
   landingPage(req,res){
      res.render('landing');
   }
   
   //displays register page
   register(req,res){
      res.render('register');
   }

   login(req, res){
      res.render('login');
   }

   home(req, res){
      res.render('dashboard');
   }

   async createUser(req, res){
      const data = await userService.register(req.body);
      res.send(data);
   }

   itemById(req, res, next, id){

   }

   addToCart(req, res){

   }

   allCart(req, res){

   }

   findItemInCart(req, res){

   }

   updateItemInCart(req, res){

   }

   removeFromCart(req, res){

   }
}

module.exports = new userController();