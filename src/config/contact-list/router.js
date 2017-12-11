/**
 * Created by SLEEK on 11/30/2017.
 */
var express = require('express');
// // Import index action from movies controller
var contacts = require('../../controllers/contacts');
// Initialize the router
var router = express.Router();
// // Handle /movies.json route with index action from movies controller
router.route('/contacts').get(contacts.index);
router.route('/new').post(contacts.save);
router.route('/contact/:id').put(contacts.update);
router.route('/contact/:id').delete(contacts.delete);
// console.log(test);
module.exports = router;