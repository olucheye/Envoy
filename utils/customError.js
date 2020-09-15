/**
 * Custom Error Class to format error messages properly
 */

class customError extends Error {
   constructor(message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500;
   }
}

module.exports = customError;