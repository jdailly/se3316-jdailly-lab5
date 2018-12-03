const Dmca = require('../models/dmca.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//var sanitizeHtml = require('sanitize-html');
 
//var dirty = 'some really tacky HTML';
//var clean = sanitizeHtml(dirty);


// controllers/dmcas.js

exports.dmca_create = function (req, res) {
    console.log("post works");
    //console.log(req.body.email);
    
    let dmca = new Dmca(
        {
            email: req.body.email,
            who: req.body.who,
            what: req.body.what,
            where: req.body.what
        }
    );
    
    console.log(dmca);

    dmca.save(function (err,next) {
        if (err) {
            return next(err);
        }
        res.send('Dmca Created successfully')
    })
};


// controllers/dmcas.controller.js
exports.dmca_details = function (req, res,next) {
    res.send('get works');
    Dmca.findById(req.params.id, function (err, dmca) {
        if (err) {
        return next(err);
        }
        res.send(dmca);
    })
};

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

exports.dmca_update = function (req, res) {
    
    Dmca.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, dmca,next) {
        if (err) return next(err);
        res.send('Dmca udpated.');
    });
};

exports.dmca_delete = function (req, res) {
    Dmca.findByIdAndRemove(req.params.id, function (err, next) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.dmca_findall= function (req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
    Dmca.find({}, function(err,result) {
        if (err) return next(err);
        
        res.send(result);
    })
    
}

exports.dmca_deleteItem=function (req, res, next){
    Dmca.findOneAndDelete({}, function(err,next) {
        if (err) return next(err);
        
        
    });
    
}