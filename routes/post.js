const express = require('express');
const collector = express.Router();

/* GET home page. */
collector.get('/', function(req, res, next) {
  res.send('aqui va post');
});

// // POST
// collector.post('/registrarse', function(req, res, next) {
//   if (req.body !== {}) {
   
//   }
// });

module.exports = collector;