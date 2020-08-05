/**
 * @file: Controller Class that handles the routing to ejs views on Web
 * @action GET Requests to web routes
 */ 


class userController {
   //homepage
   home(req,res){
      res.render('landing');
   }
   
   //displays register page
   register(req,res){
      res.render('register');
   }

   //displays login page
   login(req,res){
      res.render('login');
   }

   //logouts user from active session
   logout(req,res){
      //delay the process by 2secs
        req.logout();
        setTimeout(() => {
            res.redirect('/');
        }, 2000);
   }

}

module.exports = new userController();