const Policy = require('../models/policy.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/policys.js

exports.policy_create = function (req, res) {
    
    console.log("post works");

    
    let policy = new Policy(
        {
            descript: req.body.descript
            
        }
    );
    
    

    policy.save(function (err,next) {
        if (err) {
            return next(err);
        }
        res.send('Policy Created successfully')
    })
};


// controllers/policys.controller.js
exports.policy_details = function (req, res,next) {
    res.send('get works');
    Policy.findById(req.params.id, function (err, policy) {
        if (err) {
        return next(err);
        }
        res.send(policy);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.policy_update = function (req, res) {
    console.log(req);
    console.log("yippie");
    Policy.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, policy,next) {
        if (err) return next(err);
        res.send(policy);
    });
};

exports.policy_update_rating = function (req, res) {
    
    Policy.findByIdAndUpdate(req.params.id,{$push:{rating: req.body.rating}}, {$set: req.body}, function (err, policy,next) {
        if (err) return next(err);
        res.send(policy);
    });
};

exports.policy_update_comment = function (req, res) {
    
    Policy.findByIdAndUpdate(req.params.id,{$push:{comment: req.body.comment}}, {$set: req.body}, function (err, policy,next) {
        if (err) return next(err);
        res.send(policy);
    });
};



exports.policy_delete = function (req, res) {
    Policy.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.policy_findall= function (req, res,next) {
   
    Policy.find({}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.policy_deleteItem=function (req, res, next){
    Policy.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}