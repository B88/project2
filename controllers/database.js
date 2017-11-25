var express = require('express');
var router = express.Router();
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
//var path = require('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://Bryce:lavalamp@ds064198.mlab.com:64198/proj2';

module.exports.storeData = function (req, res) {
    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;
        /**************************************************************************
         * IMPORTANT:  this is how you generate  a random number for  3IDs that
         * you will need for the collections cusomerID, billinID and   shippingID
         *    WHY?  the retrieve _id  info after and  insert (see below)  does not seem
         *     to function properly on Heroku
         *    so to know the ID we simply generate it in code  rather than
         *     autogenerate it for the documents we newly insert into the CUSOTMERS, BILLING, SHIPPING
         *      for ORDERS we allow the system to autogenerate its  _id
         */
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        //var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        //var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        //customer collection operation
        var CUSTOMERS = db.collection('CUSTOMERS');


        //var body = JSON.stringify(req.body);  //if wanted entire body as JSON
        //var params = JSON.stringify(req.params);//if wanted parameters
        //var shipment_info = params['shipment_info'];  //retrieve the data associated with shipment_info

        //res.render('storeData', shipment_info);

        /*var customerdata = {
            _id: customerID,
            FIRSTNAME: shipment_info['fname'],
            LASTNAME: shipment_info['lname'],
            STREET: shipment_info['add1'] + ' ' + shipment_info['add2'],
            CITY: shipment_info['city'],
            STATE: shipment_info['state'],
            ZIP: shipment_info['zip'],
            EMAIL: shipment_info['email']
        };

        CUSTOMERS.insertOne(customerdata, function (err) {
            if (err) throw err;
        });
*/
        CUSTOMERS.find().toArray(function (err, docs) {
            if(err) throw err;
            res.render('storeData', {results: docs});
        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });
};

module.exports = router;