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

module.exports.storeData = function (req, res, next) {
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

            var shipment_info = router.get('data');
            var customerdata = {
                _id: customerID,
                FIRSTNAME: shipment_info['fname'],
                LASTNAME: shipment_info['lname'],
                STREET: shipment_info['add1'] + ' ' + shipment_info['add2'],
                CITY: shipment_info['city'],
                STATE: shipment_info['state'],
                ZIP: shipment_info['zip'],
                EMAIL: shipment_info['email']
            };
            CUSTOMERS.insertOne(customerdata, function (err, result) {
                if (err) throw err;
            });

            CUSTOMERS.find().toArray(function (err, docs) {
                if(err) throw err;
                response.render('storeData', {results: docs});
            });
    });
};

module.exports = router;














/*
* Taken from  http://docs.mongodb.org/ecosystem/drivers/node-js/
 * A Node script  connecting to a MongoDB database given a MongoDB Connection
URI.
*/

var mongodb = require('mongodb');

// Create seed data -- it is in JSON format
var seedData = [
    {
        decade: '1970s',
        artist: 'Debby  Boone',
        song: 'You Light  Up My Life',
        weeksAtOne: 10
    },
    {
        decade: '1980s',
        artist: 'Olivia  Newton-John',
        song: 'Physical',
        weeksAtOne: 10
    },
    {
        decade: '1990s',
        artist: 'Mariah  Carey',
        song: 'One Sweet  Day',
        weeksAtOne: 16
    }
];

// Standard URI format:  mongodb://[dbuser:dbpassword@]host:port/dbname
// GO TO mLab.com account to see what YOUR database URL is
//CHANGE the url so it is correct for your account
var uri ='mongodb://Bryce:lavalamp@ds064198.mlab.com:64198/proj2';

//using mongodb module
mongodb.MongoClient.connect(uri, function(err, db) {

    if(err) throw err;

    /*
     * First we'll add a  few songs. Nothing is required to create the
     * songs collection;  it is created automatically when we insert.
     */
    var songs =  db.collection('');

    // Note that the  insert method can take either an array or a dict.
    songs.insert(seedData, function(err, result) {
        if(err) throw err;

        /*
         * Then we need to  give Boyz II Men credit for their contribution
         * to the hit  "One Sweet Day".
         */
        songs.update(
            { song: 'One  Sweet Day' },
            { $set: {  artist: 'Mariah Carey ft. Boyz II Men' } },
            function (err,  result) {
                if(err) throw  err;
                /*
                 * Finally we  run a query which returns all the hits that spend 10 or
                 * more weeks  at number 1.
                 */
                songs.find({ weeksAtOne : { $gte: 10 } }).sort({ decade: 1}).toArray(function (err, docs) {
                    if(err)  throw err;
                    docs.forEach(function  (doc) {
                        console.log('In the  ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc ['artist'] + ' topped  the charts for ' + doc['weeksAtOne'] + ' straight weeks.');
                    });

                    // uncomment the following code if you wish to drop the collection (like a table) songs
                    /***************************commented OUT
                     songs.drop(function (err) {
              if(err)  throw err;
              // Only  close the connection when your app is terminating.
              db.close(function  (err) {
                if(err)  throw err;
               });
            });
                     */



                });
            }
        );
    });
});