/**
 * Created by SLEEK on 12/9/2017.
 */
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/call-history', ['histories']);

module.exports = {
    index : function(req, res, next){
        // Find all movies and return json response
        db.histories.find(function(err, histories){
            if(err){
                res.send(err);
            }
            console.log(histories);
            res.json(histories);
        });
    },

    single: function(req, res, next){
        db.histories.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, history){
            if(err){
                res.send(err);
            }
            res.json(history);
        });
    },

    save : function(req, res, next){
        var history = req.body;
        if(!history.name || !history.phone_number){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            db.histories.save(history, function(err, history){
                if(err){
                    res.send(err);
                }
                res.json(history);
                console.log('Successfully dialed a number');
            });
        }
    },

    delete : function(req, res, next){
        db.histories.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, history){
            if(err){
                res.send(err);
            }
            res.json(history);
        });
    }
};