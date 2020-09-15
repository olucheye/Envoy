const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const dbURI = process.env.DB_URI;

const dbOptions = {
   useNewUrlParser:true,
   useUnifiedTopology: true,
   useCreateIndex: true
};

function initDB() {
   mongoose
      .connect(dbURI, dbOptions)
      .then(()=> console.log(` :::>  Database is now connected`))
      .catch((err) => console.log(`:::> Error!, Couldn't connect to databse`));
}

module.exports = initDB;