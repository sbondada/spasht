/**
 * Created by root on 1/17/15.
 */
/**
 * This handles the signing up of users
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

// The POST /login route
router.post('/', function (req, res) {

    // The posted information from the front-end
    var body = req.body;
    // Current time this occurred
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    // Check to see if the user already exists
    // using their email address
    Users.findOne({

        'email': body.email, 'password' : body.password

    }, function (err, user) {
        console.log("Body : ", body);
        console.log("User : ", user);
        // If there's an error, log it and return to user
        if (err) {

            // Nice log message on your end, so that you can see what happened
            console.log('Couldn\'t fetch user at ' + color.red(time) + ' by ' + color.red(body.email) + ' because of: ' + err);

            // send the error
            res.status(500).json({
                'message': 'Internal server error from signing up new user. Please contact support@yourproject.com.'
            });
        }

        // If the user doesn't exist, create one
        if (!user) {
            console.log('User not found ' + color.red(time) + ' with the email: ' + color.red(body.email));
            res.status(404).json({
                'message': body.email + ' Invalid Credentials!'
            });

        }else{
            console.log('User found ' + color.green(time) + ' with the email: ' + color.green(body.email));
            res.status(200).json({
                'message': body.email + ' found!'
            });

        }

    });

});

// export the router for usage in our server/router/index.js
module.exports = router;