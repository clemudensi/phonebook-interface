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
    },

    save : function(req, res, next){
    var contact = req.body;
    if(!contact.name){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.contacts.save(contact, function(err, contact){
            if(err){
                res.send(err);
            }
            res.json(contact);
            console.log('Successfully created a contact');
            });
        }
    },

    update : function(req, res, next){
    var contact = req.body;
    var updcontact = {};

    if(contact.name){
        updcontact.name = contact.name;
        updcontact.phone_number = contact.phone_number;
        updcontact.address = contact.address;
    }

    if(!updcontact){
        res.status(400);
        res.json({
            "error":"Unable to update"
        });
    } else {
        db.contacts.update({_id: mongojs.ObjectId(req.params.id)},updcontact, {}, function(err, contact){
            if(err){
                res.send(err);
            }
            res.json(contact);
            console.log('Successfully edited')
            });
        }
    },

    delete : function(req, res, next){
    db.contacts.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, contact){
        if(err){
            res.send(err);
        }
        res.json(contact);
        });
    }

};