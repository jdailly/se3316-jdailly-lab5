const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/users.js

exports.user_create = function (req, res) {
    console.log("post works");
    //console.log(req.body.email);
    
    let user = new User(
        {
            email: req.body.email,
            manager: req.body.manager,
            active: req.body.active
        }
    );
    
    console.log(user);

    user.save(function (err,next) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};


// controllers/users.controller.js
exports.user_details = function (req, res,next) {
    res.send('get works');
    User.findById(req.params.id, function (err, user) {
        if (err) {
        return next(err);
        }
        res.send(user);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.user_update = function (req, res) {
    
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user,next) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.user_findall= function (req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
    User.find({}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.user_deleteItem=function (req, res, next){
    User.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}