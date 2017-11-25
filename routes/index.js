var express = require('express');
var router = express.Router();
//load controller code dealing for database
var controller = require('../controllers/database');

// GET home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Bryce\'s Project 2' });
});

//POST incoming data routed to storeData for processing
router.post("/storeData", controller.storeData);

module.exports = router;