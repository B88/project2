var express=require('express');
var router=express.Router();

//load controller code dealing with databases
var controller=require('../controllers/database');

//home page.
router.get('/',function(req,res){res.render('index',{title: 'Bryce\'s Project 2'});});

//post data routed to storeData for processing
router.post("/storeData",controller.storeData);

//export the router
module.exports=router;