/**
 * Created by SLEEK on 11/30/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define movie schema
var contactSchema = new Schema({
    name: String,
    phone_number: String,
    address: String
});

// Export Mongoose model
module.exports = mongoose.model('contact', contactSchema);