const customError = require('../utils/customError');

module.exports = (app) => {
   //catch error from mistyped URL
   // app.use((req, res) => {
   //    throw new customError("Page doesn't exist", 404)
   // });

   //errors from api
   app.use((err, req, res, next) => {
      if (err instanceof customError){
         //control custom error instance
         res.status(err.statusCode).send(err.message);
      }else if(error.name == "CastError"){
         //mongoDB error instance
         res.statusCode(400).send("Invalid id");
      }else{
         res.status(500).send(error.mesage);
      }
   })

   return app;
}
