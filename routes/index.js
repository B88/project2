var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bryce\'s Project 2' });
});

//LOAD the various controllers
var Controller = require('../controllers/database'); //load controller codes dealing with mongodb

//router.post("/storeData", Controller.storeData);

module.exports = router;