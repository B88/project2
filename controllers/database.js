var express = require('express');
var router = express.Router();
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separtors on any OS including Windows
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
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        //customer collection operation
        var CUSTOMERS = db.collection('CUSTOMERS');
        //var ORDERS = db.collection('ORDERS');
        //var BILLING = db.collection('BILLING');
        //var SHIPPING = db.collection('SHIPPING');

        //var order_info = ;
        //var billing_info = ;
        //var shipping_info = ;

        //var body = JSON.stringify(req.body);  //if wanted entire body as JSON
        //var params = JSON.stringify(req.params);//if wanted parameters
        //var query = req.query;  //if wanted the query
        //var shipment_info =   //retrieve the shipment_info data

        //var shipment_info = [];
        //shipment_info['fname'] = req.getParameter(params['info']);

        var customer_data = {
            CUSTOMER_ID: customerID,
            FIRSTNAME: req.body.fname,
            LASTNAME: req.body.lname,
            STREET: req.body.add1 + ' ' + req.body.add2,
            CITY: req.body.city,
            STATE: req.body.state,
            ZIP: req.body.zip,
            EMAIL: req.body.email
        };

        CUSTOMERS.insertOne(customer_data, function (err) {
            if (err) throw err;
        });

        /*var orderdata = {
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            DATE: billing_info[''],
            ORDER_TOTAL: ,
            PRODUCT_VECTOR: ,
            SHIPPING_ID: shippingID
        }

        var billingdata = {
            CUSTOMER_ID: customerID,

        }

        var shippingdata = {
            CUSTOMER_ID: customerID,

        }

        ORDERS.insertOne(order_data, function (err) {
            if (err) throw err;
        })

        BILLING.insertOne(billing_data, function (err) {
            if (err) throw err;
        })

        SHIPPING.insertOne(shipping_data, function (err) {
            if (err) throw err;
        })

        CUSTOMERS.find({CUSTOMER_ID: customerID}).toArray(function (err, docs) {
            if(err) throw err;
            res.render('storeData', {results: docs});
        });
*/
        CUSTOMERS.find({CUSTOMER_ID: customerID}).toArray(function (err, docs) {
            if(err) throw err;
            res.render('storeData', {results: docs});
        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });
};