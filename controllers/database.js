var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://Bryce:lavalamp@ds064198.mlab.com:64198/proj2';

//storeData function
module.exports.storeData = function (req, res) {
    //connect to mongodb
    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;
        //Generate random numbers for CUSTOMER_ID, BILLING_ID and SHIPPING_ID
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        //Get date
        var date = new Date();
        var today = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

        //organize post data for database insertion
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
        var order_data = {
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            DATE: today,
            ORDER_TOTAL: req.body.total,
            PRODUCT_VECTOR: req.body.prodv,
            SHIPPING_ID: shippingID
        };
        var billing_data = {
            CUSTOMER_ID: customerID,
            CREDITCARDNAME: req.body.ccn,
            CREDITCARDEXP: req.body.cce,
            CREDITCARDNUM: req.body.cc,
            CREDITCARDSECURITYNUM: req.body.ccsn,
            CREDITCARDTYPE: req.body.cct
        };
        var shipping_data = {
            CUSTOMER_ID: customerID,
            SHIPPING_CITY: req.body.scity,
            SHIPPING_STATE: req.body.sstate,
            SHIPPING_STREET: req.body.sstreet,
            SHIPPING_ZIP: req.body.szip
        };

        //insert data into databases
        db.collection('CUSTOMERS').insertOne(customer_data, function (err) {
            if (err) throw err;
        });
        db.collection('ORDERS').insertOne(order_data, function (err) {
            if (err) throw err;
        });
        db.collection('BILLING').insertOne(billing_data, function (err) {
            if (err) throw err;
        });
        db.collection('SHIPPING').insertOne(shipping_data, function (err) {
            if (err) throw err;
        });

        //return the rendered storeData views file
        res.render('storeData');

        //close connection before app terminates.
        db.close(function (err) {
            if(err) throw err;
        });
    });
};