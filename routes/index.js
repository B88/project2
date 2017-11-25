var express = require('express');
var router = express.Router();
var controller = require('../controllers/database'); //load controller codes dealing with mongodb

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bryce\'s Project 2' });
});

router.post("/storeData", controller.storeData);

module.exports = router;