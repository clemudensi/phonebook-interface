/**
 * Created by SLEEK on 12/9/2017.
 */
var mongoose = require('mongoose');
var History = require('../models/call-history');
var config      = require('../config/call-history/database');

var callHistory = [
    {
        "name": "Oleta Level",
        "phone_number": "+442032960159",
        "time": "2012-01-05T12:25:36.474Z"
    }, {
        "name": "Maida Harju",
        "phone_number": "+442032960899",
        "time": "2013-01-07T08:42:43.474Z"
    }, {
        "name": "Lia Pigford",
        "phone_number": "+442032960182",
        "time": "2014-01-06T19:17:12.474Z"
    }
]

mongoose.connect(config.database);

callHistory.map(function (data) {
    var history = new History(data);

    history.save();
});