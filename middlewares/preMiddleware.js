const express = require("express");
const morgan = require("morgan");
const ejs = require('ejs');
const cookies = require('cookie-parser');

module.exports = (app) => {
   //logging requests
   app.use(morgan('dev'));
   //templating engine
   app.set('view engine', 'ejs');
   //static files
   app.use(express.static('public'));
   // parsing body data
   app.use(express.json());
   app.use(express.urlencoded({extended: true}));
   //cookies management
   app.use(cookies());

   return app;
}