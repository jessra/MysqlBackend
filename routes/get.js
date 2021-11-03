const express = require('express');
const collector = express.Router();

/* GET home page. */
collector.get('/', function(req, res, next) {
  res.send("Bienvenido! Este servidor te permite mantener un registro de diferentes equipos de computación. Para más información dirígete a /informacion");
});

// // POST
// collector.post('/registrarse', function(req, res, next) {
//   if (req.body !== {}) {
   
//   }
// });

module.exports = collector;
