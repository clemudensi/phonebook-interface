var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/contact', ['contacts']);

module.exports = {
    index : function(req, res, next){
        // Find all movies and return json response
        db.contacts.find(function(err, contacts){
            if(err){
                res.send(err);
            }
            console.log(contacts);
            res.json(contacts);
        });
    }
};