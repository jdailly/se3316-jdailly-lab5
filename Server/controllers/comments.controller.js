const Comments = require('../models/comments.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/comments.js

exports.comments_create = function (req, res) {
    console.log("post works");
    console.log(req.body.user);
    
    let comments = new Comments(
        {
            productID: req.body.productID,
            user: req.body.user,
            comment: req.body.comment,
            rating: req.body.rating,
            hidden: req.body.hidden
        }
    );
    
    console.log(comments);

    comments.save(function (err,next) {
        if (err) {
            console.log('there is an error');
            return next(err);
        }
        res.send(comments)
    })
};



// controllers/comments.controller.js
exports.comments_details = function (req, res,next) {
    console.log(req.params.id);
    
    Comments.findById(req.params.id, function (err, comments,next) {
        if (err) {
        return next(err);
        }
        console.log(comments);
        res.send(comments);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.comments_update = function (req, res) {
    
    Comments.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, comments,next) {
        if (err) return next(err);
        res.send('Comments udpated.');
    });
};

exports.comments_delete = function (req, res) {
    Comments.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.comments_findall= function (req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
    Comments.find({}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.comments_deleteItem=function (req, res, next){
    Comments.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}