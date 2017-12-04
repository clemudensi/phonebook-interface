/**
 * Created by SLEEK on 11/30/2017.
 */
var express = require('express');
// // Import index action from movies controller
var contacts = require('../controllers/contacts');
// Initialize the router
var router = express.Router();
// // Handle /movies.json route with index action from movies controller
router.route('/contacts.json').get(contacts.index);
// console.log(test);
module.exports = router;