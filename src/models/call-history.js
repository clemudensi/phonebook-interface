/**
 * Created by SLEEK on 12/9/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define movie schema
var historySchema = new Schema({
    name: String,
    phone_number: String,
    time: { type: Date, default: Date.now },
});

// Export Mongoose model
module.exports = mongoose.model('History', historySchema);