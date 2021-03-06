
var dailyrecords = require('../../app/controllers/dailyrecord.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {

    app.get("/dailyrecords",dailyrecords.list); 
    //handle a post request made to root path


    app.route('/dailyrecord/:emailId')
    .post(dailyrecords.create)

    app.param('emailId', dailyrecords.create);
    //

	app.route('/dailyrecords/:dailyrecordId')
    .get(dailyrecords.read)
    .put(dailyrecords.update)
    .delete(dailyrecords.delete)

    app.param('dailyrecordId', dailyrecords.dailyRecordByID);

    app.route('/dailyrecordslist/:patientEmail')
    .get(dailyrecords.readDailyRecords)
    // Set up the parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('patientEmail', dailyrecords.dailyRecordsByPatient);
    

    
    app.route('/train_model/:patientEmail2')
    .get(dailyrecords.trainAndPredict);

    app.param('patientEmail2', dailyrecords.dailyRecordsByPatient2);
};