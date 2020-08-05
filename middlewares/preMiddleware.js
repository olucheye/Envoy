const express = require("express");
const morgan = require("morgan");
const ejs = require('ejs');

module.exports = (app) => {

   app.use(morgan('dev'));
   app.set('view engine', 'ejs');
   app.use(express.static('public'));
   app.use(express.json());
   app.use(express.urlencoded({extended: true}));

   return app;
}